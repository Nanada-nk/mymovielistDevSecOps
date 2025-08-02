import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";

// Public Pages
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import SearchPage from "../pages/SearchPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import NotFoundPage from "../pages/NotFoundPage";

// Protected Pages
import DashboardPage from "../pages/DashboardPage";
import MyListPage from "../pages/MyListPage";
import MyListByStatusPage from "../pages/MyListByStatusPage";
import MovieNotePage from "../pages/MovieNotePage";
import StatsPage from "../pages/StatsPage";
import UserSettingsPage from "../pages/UserSettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "movie/:id",
        element: <MovieDetailPage />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "my-list",
        element: <MyListPage />,
      },
      {
        path: "my-list/:status",
        element: <MyListByStatusPage />,
      },
      {
        path: "movie/:id/note",
        element: <MovieNotePage />,
      },
      {
        path: "stats",
        element: <StatsPage />,
      },
      {
        path: "settings",
        element: <UserSettingsPage />,
      },
    ],
  },
  // Catch all unmatched routes
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
