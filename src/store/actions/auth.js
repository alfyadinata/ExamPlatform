/* eslint-disable no-useless-catch */
import { SET_CURRENT_USER } from "store/reducers/currentUser";
import sessionUtils from "utils/sessionUtils";
import alertify from "alertifyjs";

export const userLogin = (payload) => async (dispatch) => {
  try {
    const { username, password } = payload;
    const validCredential = {
      username: "alfy",
      password: "123456",
      token: "token",
    };
    if (username !== validCredential.username && password !== validCredential.password) {
      return alertify.error("Invalid credential");
    }
    alertify.success("Authenticated");
    localStorage.setItem("user", JSON.stringify(validCredential));
    return dispatch({ type: SET_CURRENT_USER, data: payload });
  } catch (error) {
    throw error;
  }
};

export const userLogout = () => (dispatch) => {
  sessionUtils.clear();
  return dispatch({ type: SET_CURRENT_USER, data: null });
};

export const setCurrentUser = (userData) => async (dispatch) => dispatch({ type: SET_CURRENT_USER, data: userData });
