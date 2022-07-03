import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  userId: string | undefined;
  username: string | undefined;
}

const initialState: UserState = {
  userId: undefined,
  username: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, { payload }: PayloadAction<string>) => {
      state.userId = payload;
    },
    setUsername: (state, { payload }: PayloadAction<string>) => {
      state.username = payload;
    },
  },
});

export const { setUserId, setUsername } = userSlice.actions;

export default userSlice.reducer;
