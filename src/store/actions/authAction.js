import axios from "axios";
export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";
export const LOG_OUT = "LOG_OUT";
export const REFRESH = "REFRESH";

export const refresh = () => {
  return async (dispatch) => {
    try {
      var isLoggedIn = localStorage.getItem("UserToken");
      if (isLoggedIn) {
        dispatch({ type: REFRESH, isAuth: true });
      } else {
        dispatch({ type: REFRESH, isAuth: false });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("UserToken");
      dispatch({ type: LOG_OUT });
    } catch (error) {
      console.log(error);
    }
  };
};
export const signUp = (username, email, password) => {
  return async (dispatch) => {
    try {
      axios
        .post("http://10.10.64.11:5000/user/api/sign-up", {
          // .post("http://localhost:5000/user/api/sign-up", {
          name: username,
          email: email,
          password: password,
        })
        .then((success) => {
          localStorage.setItem("UserToken", success.data.token);
          dispatch({
            type: SIGN_UP,
            userToken: success.data.token,
            userId: success.data._id,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      axios
        .post("http://localhost:5000/user/api/log-in", {
          email: email,
          password: password,
        })
        .then((success) => {
          if (!success.data.msg) {
            localStorage.setItem("UserToken", success.data.token);
            dispatch({
              type: SIGN_IN,
              userToken: success.data.token,
              userId: success.data.userId,
            });
          }
          // console.log(success.data.msg);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };
};
