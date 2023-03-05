import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokenStatus: "void",
  dataStatus: "void",
  data: null,
  error: null,
  token: null,
};
const { actions, reducer } = createSlice({
  name: "login",
  initialState,
  reducers: {
    userDataFetching: {
      prepare: (token) => ({
        payload: { token },
      }),
      reducer: (state, action) => {
        if (state.dataStatus === undefined) {
          return initialState;
        }
        if (state.dataStatus === "void") {
          state.dataStatus = "pending";
          return;
        }
        if (state.dataStatus === "rejected") {
          state.dataStatus = "pending";
          state.error = null;
          return;
        }
        if (state.dataStatus === "resolved") {
          state.dataStatus = "updating";
          return;
        }
      },
    },    
    userDataResolved: {
      prepare: (token, data) => ({
        payload: { token, data },
      }),
      reducer: (state, action) => {
        if (state.dataStatus === undefined) {
          return initialState;
        }
        if (state.dataStatus === "pending" || state.dataStatus === "updating") {
          state.dataStatus = "resolved";
          state.data = action.payload.data;
          state.token = action.payload.token;
          return;
        }
      },
    },   
    userDataRejected: {
      prepare: (token, error) => ({
        payload: { token, error },
      }),
      reducer: (state, action) => {
        if (state.dataStatus === undefined) {
          return initialState;
        }
        if (state.dataStatus === "pending" || state.dataStatus === "updating") {
          state.dataStatus = "rejected";
          state.error = action.payload;
          state.data = null;
          return;
        }
      },
    },    
    userTokenFetching: {
      prepare: (userLogin) => ({
        payload: { userLogin },
      }),
      reducer: (state, action) => {
        if (state.tokenStatus === undefined) {
          return initialState;
        }
        if (state.tokenStatus === "void") {
          state.tokenStatus = "pending";
          return;
        }
        if (state.tokenStatus === "rejected") {
          state.tokenStatus = "pending";
          state.error = null;
          return;
        }
        if (state.tokenStatus === "resolved") {
          state.tokenStatus = "updating";
          return;
        }
      },
    },   
    userTokenResolved: {
      prepare: (userLogin, token) => ({
        payload: { userLogin, token },
      }),
      reducer: (state, action) => {
        if (state.tokenStatus === undefined) {
          return initialState;
        }
        if (
          state.tokenStatus === "pending" ||
          state.tokenStatus === "updating"
        ) {
          state.tokenStatus = "resolved";
          state.data = action.payload;
          return;
        }
      },
    },    
    userTokenRejected: {
      prepare: (userLogin, error) => ({
        payload: { userLogin, error },
      }),
      reducer: (state, action) => {
        if (state.tokenStatus === undefined) {
          return initialState;
        }
        if (
          state.tokenStatus === "pending" ||
          state.tokenStatus === "updating"
        ) {
          state.tokenStatus = "rejected";
          state.error = action.payload.message;
          state.data = null;
          return;
        }
      },
    },
    userUpdateProfile: {
      prepare: (token, firstName, lastName) => ({
        payload: { token, firstName, lastName },
      }),
      reducer: (state, action) => {
        state.data.firstName = action.payload.firstName;
        state.data.lastName = action.payload.lastName;
        return;
      },
    },   
    reset: {
      reducer: () => {
        return initialState;
      },
    },
  },
});

export { actions };
export default reducer;
