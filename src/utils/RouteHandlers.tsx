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
  if (isAuthenticated) {
    if (isModerator) {
      return <Navigate to="/admin-update" />;
    }
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export const AdminRoute = () => {
  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (!isModerator) {
    // If the user is authenticated but not a moderator, redirect to /home or any other page
    return <Navigate to="/home" />;
  }

  // If the user is authenticated and is a moderator, allow access to the admin page
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};