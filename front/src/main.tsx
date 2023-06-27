import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./AppLayout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/projects", element: <div>/projects</div> },
  { path: "/users", element: <div>/users</div> },
  { path: "/login", element: <div>/login</div> },
  { path: "/signup", element: <div>/signup</div> },
  { path: "/projects/:id/table", element: <div>/projects/:id/table</div> },
  { path: "/projects/:id/tickets", element: <div>/projects/:id/tickets</div> },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppLayout>
      <RouterProvider router={router} />
    </AppLayout>
  </React.StrictMode>
);
