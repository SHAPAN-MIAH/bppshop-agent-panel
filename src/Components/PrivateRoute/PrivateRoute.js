import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { UserContext } from "./../../App";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const isLoggedIn = () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      return false;
    }
    const decodedToken = jwt_decode(token);
    const currentTime = new Date().getTime() / 1000;
    return decodedToken.exp > currentTime;
    // return decodedToken;
  };

  if (!isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
