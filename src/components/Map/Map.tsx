import { Status, Wrapper as MapWrapper } from "@googlemaps/react-wrapper";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { createCustomEqual } from "fast-equals";
import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCenter, setZoomLevel } from "../../store";
import { Wrapper } from "./Styled";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

export const Map = () => {
  const [markers, setMarkers] = useState<google.maps.LatLng[]>([]);

  const dispatch = useAppDispatch();
  const { center, zoomLevel } = useAppSelector(({ map }) => map);

  interface CustomMapMouseEvent extends google.maps.MapMouseEvent {
    placeId?: string;
  }

  const onClick = (e: CustomMapMouseEvent) => {
    if (!e.placeId) setMarkers([...markers, e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    dispatch(setCenter(m.getCenter()!.toJSON()));
    dispatch(setZoomLevel(m.getZoom()!));
  };

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
          {markers.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))}
        </MapComponent>
      </MapWrapper>
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

const Marker = (options: google.maps.MarkerOptions) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker({ clickable: true }));
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
    }
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
