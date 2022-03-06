import "./App.css";
import { Home } from "./compornents/Home";
import { Edit } from "./compornents/Edit";
import { AuthProvider } from "./auth/AuthProvider";
import { Login } from "./auth/Login";
import SignUp from "./auth/SignUp";
import { PrivateRoute } from "./auth/PrivateRoute";
import { List } from "./compornents/List";
import { Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path=":id" element={<Edit />} />
          <Route path="/list" element={<List />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </AuthProvider>
  );
};