import React from "react";
import { useDispatch } from "react-redux";
import * as authAction from "../../store/actions/authAction";

const LogOut = (props) => {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <button
        onClick={() => {
          dispatch(authAction.logOut());
          props.history.replace("/");
          window.location.reload();
        }}
      >
        Logout
      </button>
      <h1>Log out</h1>
    </React.Fragment>
  );
};

export default LogOut;
