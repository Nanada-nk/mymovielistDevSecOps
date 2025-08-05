import { useEffect } from "react";
import { useUserStore } from "../stores/useUserStore.js";
import { Navigate, useLocation } from "react-router";

export default function AuthGuard({ children }) {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("User not authenticated, redirecting to login");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}