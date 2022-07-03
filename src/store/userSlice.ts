import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  searchTerm: string | undefined;
  userId: string | undefined;
  username: string | undefined;
}

const initialState: UserState = {
  searchTerm: undefined,
  userId: undefined,
  username: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSearchTerm: (state, { payload }: PayloadAction<string>) => {
      state.searchTerm = payload;
    },
    setUserId: (state, { payload }: PayloadAction<string>) => {
      state.userId = payload;
    },
    setUsername: (state, { payload }: PayloadAction<string>) => {
      state.username = payload;
    },
  },
});

export const { setSearchTerm, setUserId, setUsername } = userSlice.actions;

export default userSlice.reducer;
