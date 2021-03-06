import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserMarkerDetailed {
  description?: string | null | undefined;
  id: string;
  title: string;
  lat: number | null | undefined;
  lng: number | null | undefined;
  userId: string;
  username: string;
}

export interface MapState {
  center: google.maps.LatLngLiteral;
  newPin: google.maps.LatLng | null;
  selectedPinCoordinates: google.maps.LatLng | null;
  userMarkers: google.maps.LatLng[];
  userMarkersDetailed: UserMarkerDetailed[];
  userMarkersFiltered: UserMarkerDetailed[];
  zoomLevel: number;
}

const initialState: MapState = {
  center: { lat: -27.5179977, lng: 153.116017 },
  newPin: null,
  selectedPinCoordinates: null,
  userMarkers: [],
  userMarkersDetailed: [],
  userMarkersFiltered: [],
  zoomLevel: 12,
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
    removeDetailedMarker: (state, { payload }: PayloadAction<string>) => {
      state.userMarkersDetailed = state.userMarkersDetailed.filter(
        (marker) => marker.id !== payload
      );
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
    setNewPin: (
      state,
      { payload }: PayloadAction<google.maps.LatLng | null>
    ) => {
      state.newPin = payload;
    },
    setSelectedPinCoordinates: (
      state,
      { payload }: PayloadAction<google.maps.LatLng | null>
    ) => {
      state.selectedPinCoordinates = payload;
    },
    setUserMarkersFiltered: (
      state,
      { payload }: PayloadAction<UserMarkerDetailed[]>
    ) => {
      state.userMarkersFiltered = payload;
    },
    setZoomLevel: (state, { payload }: PayloadAction<number>) => {
      state.zoomLevel = payload;
    },
    updateDetailedMarker: (
      state,
      {
        payload,
      }: PayloadAction<{
        description: string | undefined | null;
        id: string;
        title: string;
      }>
    ) => {
      const target = state.userMarkersDetailed.find(
        (marker) => marker.id === payload.id
      );

      state.userMarkersDetailed = [
        ...state.userMarkersDetailed.filter(
          (marker) => marker.id !== payload.id
        ),
        { ...target!, description: payload.description, title: payload.title },
      ];
    },
  },
});

export const {
  addUserMarker,
  addUserMarkerDetailed,
  removeDetailedMarker,
  removeUserMarker,
  setCenter,
  setMarkers,
  setNewPin,
  setSelectedPinCoordinates,
  setUserMarkersFiltered,
  setZoomLevel,
  updateDetailedMarker,
} = mapSlice.actions;

export default mapSlice.reducer;
