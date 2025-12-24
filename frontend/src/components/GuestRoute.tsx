import React, { ReactElement, ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const GuestRoute = ({ children }: { children: ReactElement }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (isLoggedIn) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }

  return children;
};

export default GuestRoute;
