import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthorizedRoute from "./AuthorizedRoute";
import ParcelsList from "./pages/ParcelsList";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthorizedRoute>
        <ParcelsList />
      </AuthorizedRoute>
    ),
  },
  {
    path: "/status",
    element: (
      <AuthorizedRoute>
        <ParcelsList />
      </AuthorizedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
