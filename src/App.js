import "./App.css";
import { Home } from "./component/Home";
import { Edit } from "./component/Edit";
import { AuthProvider } from "./auth/AuthProvider";
import { Login } from "./auth/Login";
import SignUp from "./auth/SignUp";
import { PrivateRoute } from "./auth/PrivateRoute";
import { List } from "./component/List";
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
