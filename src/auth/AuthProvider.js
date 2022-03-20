import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  const signup = async (email, password) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);
      setAuthChecked(true);

      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  const login = async (email, password) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      setCurrentUser(user);
      setAuthChecked(true);

      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setAuthChecked(true);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ signup, login, currentUser, authChecked }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
