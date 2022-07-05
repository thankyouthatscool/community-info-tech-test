import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  isLoggingIn: boolean;
  searchTerm: string | undefined;
  userId: string | undefined;
  username: string | undefined;
}

const initialState: UserState = {
  isLoggingIn: false,
  searchTerm: undefined,
  userId: undefined,
  username: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      localStorage.removeItem("userEmail");
      state.userId = undefined;
      state.username = undefined;
    },
    setIsLoggingIn: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoggingIn = payload;
    },
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

export const {
  clearUser,
  setIsLoggingIn,
  setSearchTerm,
  setUserId,
  setUsername,
} = userSlice.actions;

export default userSlice.reducer;
