import {
  AccountCircle,
  GpsFixed,
  MapRounded,
  PushPinRounded,
} from "@mui/icons-material";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Card,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

import { Map } from "./components";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setCenter, setZoomLevel } from "./store";
import { ContentWrapper, RootWrapper } from "./Styled";

export const App = () => {
  const [bottomNavigationValue, setBottomNavigationValue] = useState<number>(0);

  const initialLoadRef = useRef<boolean>(false);

  const dispatch = useAppDispatch();
  const { username } = useAppSelector(({ user }) => user);

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
    <RootWrapper>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography component="div" variant="h6" sx={{ flexGrow: 1 }}>
            Hi, {username}
          </Typography>
          <IconButton color="inherit" size="large">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
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
          <Button
            color="primary"
            onClick={handleGetCurrentLocation}
            size="small"
            style={{ marginLeft: "0.5rem" }}
            variant="contained"
          >
            <GpsFixed />
          </Button>
        </div>
        <Map />
      </ContentWrapper>
      {mobileMatch && (
        <BottomNavigation
          showLabels
          onChange={(_, newValue) => {
            setBottomNavigationValue(() => newValue);
          }}
          value={bottomNavigationValue}
        >
          <BottomNavigationAction icon={<MapRounded />} label="Map" />
          <BottomNavigationAction icon={<PushPinRounded />} label="My Pins" />
        </BottomNavigation>
      )}
    </RootWrapper>
  );
};
