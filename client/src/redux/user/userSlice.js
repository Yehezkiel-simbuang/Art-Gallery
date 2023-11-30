import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    LoginSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    UpdateSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
    },
  },
});

export const { LoginSuccess, UpdateSuccess, signOut } = userSlice.actions;
export default userSlice.reducer;
