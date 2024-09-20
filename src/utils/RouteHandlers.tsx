import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { JsxChild } from "typescript";
import { getUser } from "./AuthService";

type TRouteHandler = {
  isAuthenticated: boolean;
};

// TODO: Integration with backend
const isAuthenticated = getUser(); // to update auth logic

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
  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" />;
};
