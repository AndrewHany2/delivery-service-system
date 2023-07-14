import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthorizedRoute from "./AuthorizedRoute";
import Login from "./pages/login";
import Send from "./pages/send";
import Status from "./pages/status";
import "bootstrap/dist/css/bootstrap.min.css";
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
        <Status />
      </AuthorizedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/send",
    element: (
      <AuthorizedRoute>
        <Send />
      </AuthorizedRoute>
    ),
  },
  {
    path: "/status",
    element: (
      <AuthorizedRoute>
        <Status />
      </AuthorizedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
