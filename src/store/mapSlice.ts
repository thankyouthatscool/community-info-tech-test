import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserMarkerDetailed {
  description?: string | null | undefined;
  id: string;
  title: string;
  lat: number | null | undefined;
  lng: number | null | undefined;
  userId: string;
}

export interface MapState {
  center: google.maps.LatLngLiteral;
  zoomLevel: number;
  userMarkers: google.maps.LatLng[];
  userMarkersDetailed: UserMarkerDetailed[];
}

const initialState: MapState = {
  center: { lat: -27.5179977, lng: 153.116017 },
  zoomLevel: 12,
  userMarkers: [],
  userMarkersDetailed: [],
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    addUserMarker: (state, { payload }: PayloadAction<google.maps.LatLng>) => {
      state.userMarkers = [...state.userMarkers, payload];
    },
    addUserMarkerDetailed: (
      state,
      { payload }: PayloadAction<UserMarkerDetailed>
    ) => {
      state.userMarkersDetailed = [...state.userMarkersDetailed, payload];
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
    setMarkers: (state, { payload }: PayloadAction<UserMarkerDetailed[]>) => {
      state.userMarkersDetailed = payload;
      state.userMarkers = payload.map(
        ({ lat, lng }) => new google.maps.LatLng(lat!, lng)
      );
    },
    setZoomLevel: (state, { payload }: PayloadAction<number>) => {
      state.zoomLevel = payload;
    },
  },
});

export const {
  addUserMarker,
  addUserMarkerDetailed,
  removeUserMarker,
  setCenter,
  setMarkers,
  setZoomLevel,
} = mapSlice.actions;

export default mapSlice.reducer;
