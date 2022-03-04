import React, { useContext, useEffect, useState } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { Login } from "./Login";
import { auth } from "../firebase/firebase";

//AuthContextから渡されたcurrentUserがセットされていれば、app.jsの/に。（Outlet）
const PrivateRoute = ({ component, ...rest }) => {
  const { currentUser, authChecked } = useContext(AuthContext);

  return authChecked ? (
    currentUser ? (
      <Outlet />
    ) : (
      <Navigate to="/login"></Navigate>
    )
  ) : (
    <div>Loading...</div>
  );
};

export { PrivateRoute };
