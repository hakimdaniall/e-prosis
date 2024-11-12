import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { JsxChild } from "typescript";
import { getUser } from "./AuthService";
import Cookies from 'js-cookie';

type TRouteHandler = {
  isAuthenticated: boolean;
};

// TODO: Integration with backend
const isAuthenticated = getUser(); // to update auth logic
const isModerator = Cookies.get('isModerator') === 'true';

export const PrivateRoute = () => {
  return isAuthenticated ? (
    <DashboardLayout>
      {" "}
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export const PublicRoute = () => {
  // If the user is authenticated and is a moderator, navigate to /admin-update
  if (isAuthenticated) {
    if (isModerator) {
      return <Navigate to="/admin-update" />;
    }
    // If the user is authenticated but not a moderator, navigate to /home
    return <Navigate to="/home" />;
  }

  // If not authenticated, allow access to the public route
  return <Outlet />;
};