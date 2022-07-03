import { Status, Wrapper as MapWrapper } from "@googlemaps/react-wrapper";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import {
  Button,
  Drawer,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataStore } from "aws-amplify";
import { createCustomEqual } from "fast-equals";
import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { Pin } from "../../models";
import {
  addUserMarker,
  addUserMarkerDetailed,
  setCenter,
  removeUserMarker,
  setZoomLevel,
} from "../../store";
import { Wrapper } from "./Styled";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

interface CustomMapMouseEvent extends google.maps.MapMouseEvent {
  placeId?: string;
}

interface NewPinFormData {
  pinTitle: string;
  pinDescription: string;
}

export const Map = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [currentPin, setCurrentPin] = useState<google.maps.LatLng | null>(null);

  const dispatch = useAppDispatch();
  const { center, userMarkers, zoomLevel } = useAppSelector(({ map }) => map);

  const theme = useTheme();
  const mobileMatch = useMediaQuery(theme.breakpoints.down("md"));

  const { handleSubmit, register, reset } = useForm<NewPinFormData>();

  const onClick = (e: CustomMapMouseEvent) => {
    dispatch(addUserMarker(e.latLng!));
    setCurrentPin(() => e.latLng);
    setIsDrawerOpen(() => true);
  };

  const onIdle = (m: google.maps.Map) => {
    dispatch(setCenter(m.getCenter()!.toJSON()));
    dispatch(setZoomLevel(m.getZoom()!));
  };

  const onSubmit = handleSubmit(async (formData) => {
    const currentPinData = currentPin?.toJSON();
    try {
      const saveRes = await DataStore.save(
        new Pin({
          lat: currentPinData?.lat!,
          lng: currentPinData?.lng!,
          title: formData.pinTitle,
          userId: "d8c3c033-2944-4983-808f-de6a15bfd45e",
          description: formData.pinDescription,
        })
      );
      setIsDrawerOpen(() => false);
      dispatch(
        addUserMarkerDetailed({
          description: formData.pinDescription,
          id: saveRes.id,
          lat: currentPinData?.lat!,
          lng: currentPinData?.lng!,
          title: formData.pinTitle,
          userId: saveRes.userId,
        })
      );
      reset();
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <Wrapper>
      <MapWrapper
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API!}
        render={render}
      >
        <MapComponent
          fullscreenControl={false}
          mapTypeControl={false}
          controlSize={0}
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoomLevel}
          style={{ flexGrow: "1", height: "100%" }}
        >
          {userMarkers.map((latLng, i) => (
            <Marker
              id="1"
              key={i}
              onClickCallback={() => setIsDrawerOpen(() => true)}
              position={latLng}
            />
          ))}
        </MapComponent>
      </MapWrapper>
      {mobileMatch && (
        <Drawer
          anchor="bottom"
          hideBackdrop
          open={isDrawerOpen}
          variant="temporary"
        >
          <form onSubmit={onSubmit} style={{ padding: "1rem" }}>
            <TextField fullWidth label="Title" {...register("pinTitle")} />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              style={{ marginTop: "1rem" }}
              {...register("pinDescription")}
            />
            <div
              style={{
                display: "flex",

                justifyContent: "end",

                marginTop: "1rem",
              }}
            >
              <Button
                color="warning"
                onClick={() => {
                  if (currentPin) dispatch(removeUserMarker(currentPin!));
                  setCurrentPin(() => null);
                  setIsDrawerOpen(() => false);
                  reset();
                }}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                color="primary"
                style={{ marginLeft: "1rem" }}
                type="submit"
                variant="contained"
              >
                Save
              </Button>
            </div>
          </form>
        </Drawer>
      )}
    </Wrapper>
  );
};

interface MapProps extends google.maps.MapOptions {
  children?: ReactNode;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  style: { [key: string]: string };
}

const MapComponent = ({
  children,
  onClick,
  onIdle,
  style,
  ...options
}: MapProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [map, ref]);

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);
  return (
    <>
      <div ref={ref} style={style} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};

interface CustomMarkerOptions extends google.maps.MarkerOptions {
  id: string;
  onClickCallback: () => void;
}

const Marker = (options: CustomMarkerOptions) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  const { userMarkersDetailed } = useAppSelector(({ map }) => map);

  const handleMarkerClick = (options: CustomMarkerOptions) => {
    options.onClickCallback();
  };

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker({ clickable: true, label: "S" }));
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);

      marker.addListener("click", () => handleMarkerClick(options));
    }

    return () => {
      if (marker) google.maps.event.clearListeners(marker!, "click");
    };
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
  //@ts-ignore
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    //@ts-ignore
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
