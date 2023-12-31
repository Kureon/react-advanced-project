import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as postLoader } from "./pages/EventPage";
import { EventsPage, loader as postListLoader } from "./pages/EventsPage";
import { NewEventPage, loader as eventFormLoader } from "./pages/NewEventPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: postListLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: postLoader,
        // action: addComment,
      },
      {
        path: "/new-event",
        element: <NewEventPage />,
        loader: eventFormLoader,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
