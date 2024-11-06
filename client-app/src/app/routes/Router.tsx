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
        handle: { crumb: "Venues" },
        children: [
          {
            index: true,
            element: <VenueList />,
            handle: { crumb: "Venues" },
          },
          {
            path: ":id",
            element: <Outlet />,
            handle: { crumb: "Venue", id: "venue" },
            children: [
              {
                index: true,
                element: <VenueDetails />,
                handle: { crumb: "Venue", id: "venue" },
              },
              {
                path: ":id",
                element: <EventDetails />,
                handle: { crumb: "Event", id: "event" },
              },
            ],
          },
        ],
      },
      {
        path: "events",
        element: <Outlet />,
        handle: { crumb: "Events" },
        children: [
          {
            index: true,
            element: <EventList />,
            handle: { crumb: "Events" },
          },
          {
            path: ":id",
            element: <EventDetails />,
            handle: { crumb: "Event", id: "event" },
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
        handle: { crumb: "Login" },
      },
      {
        path: "profile",
        element: <Profile />,
        handle: { crumb: "Profile" },
      },
      {
        path: "register",
        element: <Register />,
        handle: { crumb: "Register" },
      },
      {
        path: "admin",
        element: <Admin />,
        handle: { crumb: "Admin" },
        children: [
          {
            path: "venues",
            element: <Outlet />,
            handle: { crumb: "Venues" },
            children: [
              {
                index: true,
                element: <VenueList adminMode={true} />,
                handle: { crumb: "Venues" },
              },
              {
                path: ":id",
                element: <Outlet />,
                handle: { crumb: "Venue", id: "venue" },
                children: [
                  {
                    index: true,
                    element: <VenueDetails adminMode={true} />,
                    handle: { crumb: "Venue", id: "venue" },
                  },
                  {
                    path: ":id",
                    element: <EventDetails adminMode={true} />,
                    handle: { crumb: "Event", id: "event" },
                  },
                ],
              },
            ],
          },
          {
            path: "events",
            element: <Outlet />,
            handle: { crumb: "Events" },
            children: [
              {
                index: true,
                element: <EventList adminMode={true} />,
                handle: { crumb: "Events" },
              },
              {
                path: ":id",
                element: <Outlet />,
                handle: { crumb: "Event", id: "event" },
                children: [
                  {
                    index: true,
                    element: <EventDetails adminMode={true} />,
                    handle: { crumb: "Event", id: "event" },
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
