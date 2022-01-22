import React, { useContext } from "react";
import { Route, Navigate, Outlet} from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { Login } from "./Login";


//AuthContextから渡されたcurrentUserがセットされていれば、app.jsの/に。（Outlet）
const PrivateRoute = ({ component, ...rest }) => {
    const { currentUser } = useContext(AuthContext);
    return currentUser ? <Outlet /> : <Navigate to ="/login"></Navigate>
};

export { PrivateRoute }