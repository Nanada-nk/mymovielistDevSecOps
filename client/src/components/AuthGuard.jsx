// import { useEffect } from "react";
// import { useUserStore } from "../stores/useUserStore";
// import { Navigate, useLocation } from "react-router";

// export default function AuthGuard({ children }) {
//   const { user, isAuthenticated } = useUserStore();
//   const location = useLocation();

//   // Check if user is authenticated
//   const authenticated = isAuthenticated();

//   useEffect(() => {
//     // Optional: You can add analytics or logging here
//     if (!authenticated) {
//       console.log("User not authenticated, redirecting to login");
//     }
//   }, [authenticated]);

//   if (!authenticated) {
//     // Redirect to login with return URL
//     return <Navigate to="/login" state={{ from: location.pathname }} replace />;
//   }

//   return children;
// }


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