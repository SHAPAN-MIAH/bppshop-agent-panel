import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import UseUser from "../../ContextApi/Hooks/useUser";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const {agent} = UseUser();

  // console.log(agent)

  const isLoggedIn = () => {
    const token = window.localStorage.getItem("token");

    if (!token) {
      return false;
    }
    const decodedToken = jwt_decode(token);
    const currentTime = new Date().getTime() / 1000;
    return decodedToken.exp > currentTime;
  };

  if (!isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
