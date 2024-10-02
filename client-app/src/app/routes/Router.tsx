import { createBrowserRouter, RouteObject } from "react-router-dom";
import ErrorPage from "../../features/errors/ErrorPage";
import VenueList from "../../features/venues/VenueList";
import EventList from "../../features/events/EventList";
import App from "../App";
import VenueDetails from "../../features/venues/VenueDetails";
import EventDetails from "../../features/events/EventDetails";
import Login from "../../features/accounts/Login";

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
    ],
  },
];

export const router = createBrowserRouter(routes);
