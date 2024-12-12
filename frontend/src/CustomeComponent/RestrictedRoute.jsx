import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RestrictedRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn===true ? <Outlet /> : <Navigate to="/login" />;
};

export default RestrictedRoute;
