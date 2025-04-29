// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth(); // Access isLoggedIn from context

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children; // Render children if logged in
};

export default PrivateRoute;
