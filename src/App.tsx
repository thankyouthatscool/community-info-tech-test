import {
  AccountCircle,
  GpsFixed,
  LogoutRounded,
  MapRounded,
  PushPinRounded,
} from "@mui/icons-material";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Amplify, DataStore } from "aws-amplify";
import { useCallback, useEffect, useState } from "react";
import {
  Navigate,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import awsConfig from "./aws-exports";
import { useAppDispatch, useAppSelector } from "./hooks";
import { User } from "./models";
import { MapRoute, MyPinsRoute, ProfileRoute } from "./routes";
import {
  clearUser,
  setIsLoggingIn,
  setCenter,
  setUserId,
  setUsername,
  setZoomLevel,
} from "./store";
import { RootWrapper } from "./Styled";

Amplify.configure(awsConfig);

export const App = () => {
  const [bottomNavigationValue, setBottomNavigationValue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { username } = useAppSelector(({ user }) => user);

  const theme = useTheme();
  const mobileMatch = useMediaQuery(theme.breakpoints.down("md"));

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname) {
      setBottomNavigationValue(
        location.pathname === "/my-pins"
          ? 1
          : location.pathname === "/profile"
          ? 2
          : 0
      );
    } else {
      setBottomNavigationValue(0);
    }
  }, [location]);

  const loadUserData = async () => {
    const localUserEmailAddress = localStorage.getItem("userEmail");

    setIsLoading(() => true);
    if (localUserEmailAddress) {
      try {
        const user = await DataStore.query(User, (u) =>
          u.email("eq", localUserEmailAddress)
        );

        if (user[0].id) {
          dispatch(setUsername(user[0].username));
          dispatch(setUserId(user[0].id));
        }
      } catch (err) {
        console.log(err);
      }
    }
    setIsLoading(() => false);
  };

  useEffect(() => {
    loadUserData();
  }, []);

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

  return (
    <RootWrapper>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography component="div" variant="h6" sx={{ flexGrow: 1 }}>
            {isLoading && "Loading..."}
            {!username && !isLoading && (
              <Button
                color="secondary"
                onClick={() => {
                  if (mobileMatch) {
                    navigate("/profile");
                  } else {
                    dispatch(setIsLoggingIn(true));
                  }
                }}
                variant="contained"
              >
                Please Login
              </Button>
            )}
            {username && !isLoading && `Hi, ${username}`}
          </Typography>
          {username && (
            <IconButton
              color="inherit"
              onClick={() => {
                dispatch(clearUser());
              }}
            >
              <LogoutRounded />
            </IconButton>
          )}
          {location.pathname === "/" && (
            <IconButton
              color="inherit"
              onClick={handleGetCurrentLocation}
              size="large"
            >
              <GpsFixed />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Routes>
        <Route element={<MapRoute />} path="/" />
        {mobileMatch && (
          <>
            <Route element={<MyPinsRoute />} path="/my-pins" />
            <Route element={<ProfileRoute />} path="/profile" />
          </>
        )}
        <Route element={<Navigate to="/" />} path="*" />
      </Routes>
      {mobileMatch && (
        <BottomNavigation
          style={{ position: "fixed", bottom: 0, width: "100%" }}
          showLabels
          onChange={(_, newValue) => {
            setBottomNavigationValue(() => newValue);
            if (newValue === 2) {
              navigate("/profile");
            } else if (newValue === 1) {
              navigate("/my-pins");
            } else {
              navigate("/");
            }
          }}
          value={bottomNavigationValue}
        >
          <BottomNavigationAction icon={<MapRounded />} label="Map" />
          <BottomNavigationAction
            disabled={!username}
            icon={<PushPinRounded />}
            label="My Pins"
          />
          <BottomNavigationAction icon={<AccountCircle />} label="Profile" />
        </BottomNavigation>
      )}
    </RootWrapper>
  );
};

// TODO:
// [ ]: Figure out log in and out on desktop
// [ ]: Maybe do something with my pins
