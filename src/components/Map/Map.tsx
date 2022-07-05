import { Status, Wrapper as MapWrapper } from "@googlemaps/react-wrapper";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { CloseRounded, EditRounded } from "@mui/icons-material";
import {
  Button,
  Drawer,
  IconButton,
  Snackbar,
  TextField,
  Typography,
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
  useEffect,
  useRef,
  useState,
} from "react";
import { Resolver, useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { Pin } from "../../models";
import { EditPinForm } from "../../routes/MapRoute/EditPinForm";
import {
  addUserMarker,
  addUserMarkerDetailed,
  removeUserMarker,
  setCenter,
  setMarkers,
  setNewPin,
  setSelectedPinCoordinates,
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
  pinDescription?: string;
}

const formResolver: Resolver<NewPinFormData> = async (values) => {
  return {
    values: values.pinTitle ? values : {},
    errors: !values.pinTitle
      ? {
          pinTitle: {
            message: "Pin title is required",
            type: "required",
          },
        }
      : {},
  };
};

export const Map = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSnackOpen, setIsSnackOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { userId, username } = useAppSelector(({ user }) => user);
  const {
    center,
    newPin,
    selectedPinCoordinates,
    userMarkers,
    userMarkersDetailed,
    userMarkersFiltered,
    zoomLevel,
  } = useAppSelector(({ map }) => map);

  const theme = useTheme();
  const mobileMatch = useMediaQuery(theme.breakpoints.down("md"));

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<NewPinFormData>({
    resolver: formResolver,
  });

  const onClick = (e: CustomMapMouseEvent) => {
    dispatch(setSelectedPinCoordinates(null));
    if (!newPin) {
      if (username) {
        dispatch(addUserMarker(e.latLng!));
        dispatch(setNewPin(e.latLng));
        setIsDrawerOpen(() => true);
      } else {
        setIsSnackOpen(() => true);
      }
    }
  };

  const handleLoadPins = async (coordinates: google.maps.LatLngBounds) => {
    const { north, east, south, west } = coordinates.toJSON();

    try {
      const res = await DataStore.query(Pin, (pin) =>
        pin.lat("gt", south).lat("lt", north).lng("gt", west).lng("lt", east)
      );

      dispatch(setMarkers(res));
    } catch (err) {
      console.log(err);
    }
  };

  const onIdle = (m: google.maps.Map) => {
    if (!newPin) {
      handleLoadPins(m.getBounds()!);
      dispatch(setCenter(m.getCenter()!.toJSON()));
      dispatch(setZoomLevel(m.getZoom()!));
    }
  };

  const onSubmit = handleSubmit(async (formData) => {
    const currentPinData = newPin?.toJSON();
    if (userId) {
      try {
        const saveRes = await DataStore.save(
          new Pin({
            description: formData.pinDescription,
            lat: currentPinData?.lat!,
            lng: currentPinData?.lng!,
            title: formData.pinTitle,
            userId: userId!,
            username: username!,
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
            username: username!,
          })
        );
        dispatch(setNewPin(null));
        reset();
      } catch (err) {
        console.log(err);
      }
    }
  });

  const handlePinCallback = (position: string) => {
    const [lat, lng] = position
      .split("")
      .filter((char) => char !== "(")
      .filter((char) => char !== ")")
      .join("")
      .split(", ")
      .map((coordinate) => parseFloat(coordinate));

    dispatch(setSelectedPinCoordinates(new google.maps.LatLng(lat, lng)));
    setIsDrawerOpen(() => true);
  };

  return (
    <Wrapper>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        message="Please login to place pin."
        onClose={() => setIsSnackOpen(() => false)}
        open={isSnackOpen}
      />
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
          {userMarkers
            .filter((marker) => {
              return userMarkersFiltered.length
                ? !userMarkersFiltered
                    .map((marker) =>
                      JSON.stringify({ lat: marker.lat, lng: marker.lng })
                    )
                    .includes(JSON.stringify(marker.toJSON()))
                : true;
            })
            .map((latLng, i) => {
              return (
                <Marker
                  key={i}
                  onClickCallback={handlePinCallback}
                  position={latLng}
                />
              );
            })}
          {userMarkersFiltered.map((marker, i) => {
            return (
              <FilteredMarker
                key={i}
                onClickCallback={handlePinCallback}
                position={new google.maps.LatLng(marker.lat!, marker.lng)}
              />
            );
          })}
          {userMarkers
            .filter((marker) => {
              return userMarkersDetailed
                .filter((marker) => marker.userId === userId)
                .map(({ lat, lng }) => JSON.stringify({ lat, lng }))
                .includes(JSON.stringify(marker.toJSON()));
            })
            .map((marker, i) => {
              return (
                <MyMarker
                  key={i}
                  onClickCallback={handlePinCallback}
                  position={marker}
                />
              );
            })}
          {selectedPinCoordinates && (
            <SelectedMarker
              onClickCallback={handlePinCallback}
              position={selectedPinCoordinates}
            />
          )}
        </MapComponent>
      </MapWrapper>
      {mobileMatch && (
        <Drawer
          anchor="bottom"
          disableRestoreFocus
          open={isDrawerOpen}
          onClose={() => {
            if (newPin) dispatch(removeUserMarker(newPin!));
            dispatch(setNewPin(null));
            dispatch(setSelectedPinCoordinates(null));
            setIsDrawerOpen(() => false);
            setIsEdit(() => false);
            reset();
          }}
          variant="temporary"
        >
          {newPin && (
            <form onSubmit={onSubmit} style={{ padding: "1rem" }}>
              <Typography variant="h6">Add New Pin</Typography>
              <TextField
                error={!!errors.pinTitle}
                fullWidth
                helperText={errors.pinTitle?.message}
                label="Title"
                {...register("pinTitle")}
              />
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
                    if (newPin) dispatch(removeUserMarker(newPin!));
                    dispatch(setNewPin(null));
                    dispatch(setSelectedPinCoordinates(null));
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
          )}
          {!isEdit && selectedPinCoordinates && (
            <div style={{ display: "flex", padding: "1rem" }}>
              <div style={{ flex: 1, marginLeft: "1rem" }}>
                <Typography variant="h6">
                  {
                    userMarkersDetailed.find(
                      (pin) =>
                        pin.lat === selectedPinCoordinates.lat() &&
                        pin.lng === selectedPinCoordinates.lng()
                    )?.title
                  }
                </Typography>
                <Typography variant="body1">
                  {
                    userMarkersDetailed.find(
                      (pin) =>
                        pin.lat === selectedPinCoordinates.lat() &&
                        pin.lng === selectedPinCoordinates.lng()
                    )?.description
                  }
                </Typography>
                <Typography variant="body1">
                  Posted by:{" "}
                  {
                    userMarkersDetailed.find(
                      (pin) =>
                        pin.lat === selectedPinCoordinates.lat() &&
                        pin.lng === selectedPinCoordinates.lng()
                    )?.username
                  }
                </Typography>
              </div>
              {userMarkersDetailed.find(
                (pin) =>
                  pin.lat === selectedPinCoordinates.lat() &&
                  pin.lng === selectedPinCoordinates.lng()
              )?.username === username && (
                <div>
                  <IconButton
                    color="secondary"
                    onClick={() => setIsEdit(() => true)}
                  >
                    <EditRounded />
                  </IconButton>
                </div>
              )}
              <div>
                <IconButton
                  color="secondary"
                  onClick={() => {
                    dispatch(setNewPin(null));
                    dispatch(setSelectedPinCoordinates(null));
                    setIsDrawerOpen(() => false);
                    reset();
                  }}
                >
                  <CloseRounded />
                </IconButton>
              </div>
            </div>
          )}
          {isEdit && selectedPinCoordinates && (
            <div style={{ padding: "1rem" }}>
              <Typography variant="h6">Edit</Typography>
              <EditPinForm
                onCancelCallback={() => {
                  setIsDrawerOpen(() => false);
                  setIsEdit(() => false);
                }}
              />
            </div>
          )}
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
      map.setOptions({ ...options, minZoom: 10, maxZoom: 15 });
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
  onClickCallback: (position: string) => void;
}

const Marker = (options: CustomMarkerOptions) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  const handleMarkerClick = ({ position }: CustomMarkerOptions) => {
    options.onClickCallback(position?.toString()!);
  };

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
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

export const FilteredMarker = (options: CustomMarkerOptions) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  const handleMarkerClick = ({ position }: CustomMarkerOptions) => {
    options.onClickCallback(position?.toString()!);
  };

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker({ label: "👌" }));
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

export const MyMarker = (options: CustomMarkerOptions) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  const handleMarkerClick = ({ position }: CustomMarkerOptions) => {
    options.onClickCallback(position?.toString()!);
  };

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker({ label: "🔷" }));
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

export const SelectedMarker = (options: CustomMarkerOptions) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  const handleMarkerClick = ({ position }: CustomMarkerOptions) => {
    options.onClickCallback(position?.toString()!);
  };

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker({ label: "🟢" }));
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
