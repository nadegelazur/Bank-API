import { actions } from "../feature/reducer";
import SignIn from "../pages/sign-in/SignIn";
import { selectUser } from "../feature/selector";

export function signOut() {
  return (dispatch) => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(actions.reset());
  };
}

export function setRemember(token, remember) {
  localStorage.setItem("token", token);
  localStorage.setItem("isRemembered", remember);
}

export function fetchUserToken(userLogin) {
  return async (dispatch, getState) => {
    const tokenStatus = selectUser(getState()).tokenStatus;

    if (tokenStatus === "pending" || tokenStatus === "updating") {
      return;
    }
    dispatch(actions.userTokenFetching(userLogin));

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLogin),
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/login",
        options
      );

      if (response.status === 400) {
        console.log("invalid fields");
      }
      if (response.status === 401) {
        dispatch(actions.reset());
      }

      const data = await response.json();

      dispatch(actions.userTokenResolved(data.body.token));

      return data.body.token;
    } catch (error) {
      dispatch(actions.userTokenRejected(error.message));
    }
  };
}

export function fetchUserData(token) {
  return async (dispatch, getState) => {
    const status = selectUser(getState()).dataStatus;

    if (status === "pending" || status === "updating") {
      return;
    }
    if (status === "rejected") {
      dispatch(signOut());
      return <SignIn />;
    }

    dispatch(actions.userDataFetching(token));

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        options
      );

      if (response.status === 400) {
        console.log("invalid fields");
      }
      if (response.status === 401) {
        dispatch(signOut());
      }

      const data = await response.json();
      dispatch(actions.userDataResolved(token, data.body));
    } catch (error) {
      dispatch(actions.userDataRejected(error.message));
    }
  };
}

export function updateUserData(token, firstName, lastName) {
  return async (dispatch) => {
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName }),
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        options
      );

      if (response.status === 400) {
        console.log("invalid fields");
      }
      if (response.status === 401) {
        dispatch(signOut());
      }

      dispatch(actions.userUpdateProfile(token, firstName, lastName));
    } catch (error) {
      dispatch(actions.userDataRejected(error.message));
    }
  };
}
