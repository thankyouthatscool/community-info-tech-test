import { ArrowBackRounded, EditRounded } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Card,
  CardHeader,
  Chip,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataStore } from "aws-amplify";
import { useCallback, useEffect, useRef } from "react";
import { Resolver, useForm } from "react-hook-form";

import { Map } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Pin } from "../../models";
import {
  addUserMarkerDetailed,
  removeUserMarker,
  setCenter,
  setNewPin,
  setSelectedPinCoordinates,
  setUserMarkersFiltered,
  setZoomLevel,
} from "../../store";
import { ContentWrapper } from "./Styled";

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

export const MapRoute = () => {
  const initialLoadRef = useRef<boolean>(false);

  const dispatch = useAppDispatch();
  const {
    newPin,
    selectedPinCoordinates,
    userMarkersDetailed,
    userMarkersFiltered,
  } = useAppSelector(({ map }) => map);
  const { userId, username } = useAppSelector(({ user }) => user);

  const theme = useTheme();
  const mobileMatch = useMediaQuery(theme.breakpoints.down("md"));

  const handleGetCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        dispatch(
          setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        );
        dispatch(setZoomLevel(12));
      },
      (err) => {
        console.log(err);
      },
      { enableHighAccuracy: true }
    );
  }, [dispatch]);

  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      handleGetCurrentLocation();
    }
  }, [handleGetCurrentLocation, initialLoadRef]);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<NewPinFormData>({ resolver: formResolver });

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

  return (
    <>
      <ContentWrapper>
        <div
          style={{
            display: "flex",

            flexDirection: "column",

            padding: "0.5rem",
            position: "absolute",

            width: mobileMatch ? "100%" : "40%",

            zIndex: 1,
          }}
        >
          <Card elevation={9} style={{ flex: 1 }}>
            <Autocomplete
              disablePortal
              disableCloseOnSelect
              getOptionLabel={(option) =>
                `${option.title} ${option.username} ${option.description}`
              }
              clearOnEscape
              options={userMarkersDetailed}
              renderInput={(params) => {
                return (
                  <TextField {...params} placeholder="Search Local Pins" />
                );
              }}
              renderOption={(params, option) => {
                return userMarkersFiltered
                  .map((pin) => pin.id)
                  .includes(option.id) ? (
                  <li key={option.id} />
                ) : (
                  <li
                    key={option.id}
                    style={{
                      alignItems: "start",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    {...params}
                  >
                    <div>
                      <strong>{option.title}</strong>
                    </div>
                    <div>{option.description}</div>
                    <div>{`Posted by: ${option.username}`}</div>
                  </li>
                );
              }}
              renderTags={(values) =>
                values.map((pin) => (
                  <Chip
                    key={pin.id}
                    label={`${pin.title}`}
                    onDelete={() => {
                      dispatch(
                        setUserMarkersFiltered(
                          userMarkersFiltered.filter(
                            (marker) => marker.id !== pin.id
                          )
                        )
                      );
                    }}
                  />
                ))
              }
              noOptionsText="No Local Pins"
              multiple
              limitTags={3}
              onChange={(_, newValues) => {
                dispatch(setUserMarkersFiltered(newValues));
              }}
              value={userMarkersFiltered}
            />
          </Card>
          {!mobileMatch && newPin && (
            <Card
              elevation={9}
              style={{ marginTop: "0.5rem", padding: "1rem" }}
            >
              <Typography variant="h6">Add New Pin</Typography>
              <form onSubmit={onSubmit} style={{ padding: "1rem" }}>
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
            </Card>
          )}
          {!mobileMatch && selectedPinCoordinates && (
            <Card elevation={9} style={{ marginTop: "0.5rem" }}>
              <div style={{ display: "flex", padding: "1rem" }}>
                <div>
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      dispatch(setNewPin(null));
                      dispatch(setSelectedPinCoordinates(null));
                      reset();
                    }}
                  >
                    <ArrowBackRounded />
                  </IconButton>
                </div>
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
                    <IconButton color="secondary">
                      <EditRounded />
                    </IconButton>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
        <Map />
      </ContentWrapper>
    </>
  );
};
