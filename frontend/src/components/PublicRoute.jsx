// src/components/PublicRoute.js
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export default function PublicRoute() {
  const token = Cookies.get("token");

  if (token) {
    // Redirect authenticated users to dashboard
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}