import { createBrowserRouter, RouteObject } from "react-router-dom";
import ErrorPage from "../../features/errors/ErrorPage";
import VenueList from "../../features/venues/VenueList";
import EventList from "../../features/events/EventList";
import App from "../App";
import VenueDetails from "../../features/venues/VenueDetails";
import EventDetails from "../../features/events/EventDetails";
import Login from "../../features/accounts/Login";
import Profile from "../../features/accounts/Profile";
import Register from "../../features/accounts/Register";
import Admin from "../../features/admin/Admin";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "venues",
        element: <VenueList />,
      },
      {
        path: "venues/:id",
        element: <VenueDetails />,
      },
      {
        path: "events",
        element: <EventList />,
      },
      {
        path: "events/:id",
        element: <EventDetails />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "venues",
            element: <VenueList />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
