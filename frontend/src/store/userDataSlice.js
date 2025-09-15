import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {},
  reducers: {
    setUserData: (state, action) => {
      return action.payload;
    },
  },
});

export const userDataActions = userDataSlice.actions;
export default userDataSlice;
