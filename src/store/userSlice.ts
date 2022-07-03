import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  username: string | undefined;
}

const initialState: UserState = {
  username: "Sasha",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, { payload }: PayloadAction<string>) => {
      state.username = payload;
    },
  },
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
