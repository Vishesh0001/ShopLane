// src/components/ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute() {
  const token = Cookies.get("token");

  if (!token) {
    // No token → redirect to login
    return <Navigate to="/login" replace />;
  }

  // Token exists → render child component
  return <Outlet />;
}