import {
  Autocomplete,
  Card,
  Chip,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useCallback, useEffect, useRef } from "react";

import { Map } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCenter, setUserMarkersFiltered, setZoomLevel } from "../../store";
import { ContentWrapper } from "./Styled";

export const MapRoute = () => {
  const initialLoadRef = useRef<boolean>(false);

  const dispatch = useAppDispatch();
  const { userMarkersDetailed, userMarkersFiltered } = useAppSelector(
    ({ map }) => map
  );

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

  return (
    <>
      <ContentWrapper>
        <div
          style={{
            display: "flex",

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
                  <Chip key={pin.id} label={`${pin.title}/${pin.username}`} />
                ))
              }
              noOptionsText="No Local Pins"
              multiple
              limitTags={3}
              onChange={(_, v) => {
                dispatch(setUserMarkersFiltered(v));
              }}
              value={userMarkersFiltered}
            />
          </Card>
        </div>
        <Map />
      </ContentWrapper>
    </>
  );
};
