import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/reducer";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
