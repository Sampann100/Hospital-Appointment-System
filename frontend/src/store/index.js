import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./userDataSlice";

const store = configureStore({
  reducer: {
    user: userDataSlice.reducer,
  },
});

export default store;
