import { createBrowserRouter, RouteObject } from "react-router-dom";
import ErrorPage from "../../features/errors/ErrorPage";
import VenueList from "../../features/venues/VenueList";
import EventList from "../../features/events/EventList";
import App from "../App";

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
        path: "events",
        element: <EventList />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
