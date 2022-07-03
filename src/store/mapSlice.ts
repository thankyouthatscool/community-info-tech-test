import { MaleRounded } from "@mui/icons-material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MapState {
  center: google.maps.LatLngLiteral;
  zoomLevel: number;
  userMarkers: google.maps.LatLng[];
}

const initialState: MapState = {
  center: { lat: -27.5179977, lng: 153.116017 },
  zoomLevel: 12,
  userMarkers: [],
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    addUserMarker: (state, { payload }: PayloadAction<google.maps.LatLng>) => {
      state.userMarkers = [...state.userMarkers, payload];
    },
    removeUserMarker: (
      state,
      { payload }: PayloadAction<google.maps.LatLng>
    ) => {
      state.userMarkers = state.userMarkers.filter(
        (marker) => marker.toString() !== payload.toString()
      );
    },
    setCenter: (
      state,
      { payload }: PayloadAction<google.maps.LatLngLiteral>
    ) => {
      state.center = payload;
    },
    setZoomLevel: (state, { payload }: PayloadAction<number>) => {
      state.zoomLevel = payload;
    },
  },
});

export const { addUserMarker, removeUserMarker, setCenter, setZoomLevel } =
  mapSlice.actions;

export default mapSlice.reducer;
