import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { ProjectProvider } from "../contexts/ProjectContext";

//AuthContextから渡されたcurrentUserがセットされていれば、app.jsの/に。（Outlet）
const PrivateRoute = ({ component, ...rest }) => {
  const { currentUser, authChecked } = useContext(AuthContext);

  return authChecked ? (
    currentUser ? (
      <ProjectProvider>
        <Outlet />
      </ProjectProvider>
    ) : (
      <Navigate to="/login"></Navigate>
    )
  ) : (
    <div>Loading...</div>
  );
};

export { PrivateRoute };