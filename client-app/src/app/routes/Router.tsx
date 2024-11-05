import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom";
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

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "venues",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <VenueList />,
          },
          {
            path: ":id",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <VenueDetails />,
              },
              {
                path: ":id",
                element: <EventDetails />,
              },
            ],
          },
        ],
      },
      {
        path: "events",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <EventList />,
          },
          {
            path: ":id",
            element: <EventDetails />,
          },
        ],
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
        handle: { crumb: "Admin" },
        children: [
          {
            path: "venues",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <VenueList adminMode={true} />,
                handle: { crumb: "Venues" },
              },
              {
                path: ":id",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <VenueDetails adminMode={true} />,
                    handle: { crumb: "VenueDetails" },
                  },
                  {
                    path: ":id",
                    element: <EventDetails adminMode={true} />,
                    handle: { crumb: "VenueEventDetails" },
                  },
                ],
              },
            ],
          },
          {
            path: "events",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <EventList adminMode={true} />,
                handle: { crumb: "Events" },
              },
              {
                path: ":id",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <EventDetails adminMode={true} />,
                    handle: { crumb: "EventDetails" },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
