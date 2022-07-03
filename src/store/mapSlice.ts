import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MapState {
  center: google.maps.LatLngLiteral;
  zoomLevel: number;
}

const initialState: MapState = {
  center: { lat: -27.5179977, lng: 153.116017 },
  zoomLevel: 12,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
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

export const { setCenter, setZoomLevel } = mapSlice.actions;

export default mapSlice.reducer;
