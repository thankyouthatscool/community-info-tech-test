import {
  Card,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CancelRounded } from "@mui/icons-material";
import { useCallback, useEffect, useRef } from "react";

import { Map } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCenter, setSearchTerm, setZoomLevel } from "../../store";
import { ContentWrapper } from "./Styled";

export const MapRoute = () => {
  const initialLoadRef = useRef<boolean>(false);

  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector(({ user }) => user);

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
            <TextField
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        dispatch(setSearchTerm(""));
                      }}
                    >
                      {searchTerm && <CancelRounded />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                dispatch(setSearchTerm(e.target.value));
              }}
              placeholder="Search Pins"
              value={searchTerm}
            />
          </Card>
        </div>
        <Map />
      </ContentWrapper>
    </>
  );
};
