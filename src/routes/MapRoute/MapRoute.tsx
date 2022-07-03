import { Card, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";

import { Map } from "../../components";
import { useAppDispatch } from "../../hooks";
import { setCenter, setZoomLevel } from "../../store";
import { ContentWrapper } from "./Styled";

export const MapRoute = () => {
  const initialLoadRef = useRef<boolean>(false);

  const dispatch = useAppDispatch();

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
          <TextField fullWidth placeholder="Search Pins" />
        </Card>
      </div>
      <Map />
    </ContentWrapper>
  );
};
