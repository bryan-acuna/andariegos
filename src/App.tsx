import { lazy, Suspense, type JSX } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import { AuthProvider } from "./context/Authcontext";
import { useAuth } from "./hooks/useAuth";
import { ErrorBoundary, Loader, ToastProvider } from "./components";

// Lazy-loaded routes — keep them out of the initial bundle.
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Montanas = lazy(() => import("./pages/Montanas"));
const Mapa = lazy(() => import("./pages/Mapa"));
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));
const NewAdventure = lazy(() => import("./pages/NewAdventure"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { session, loading } = useAuth();
  if (loading) return null;
  return session ? children : <Navigate to="/login" replace />;
};

const withSuspense = (node: JSX.Element) => (
  <Suspense fallback={<Loader />}>{node}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: withSuspense(<About />) },
      { path: "contact", element: withSuspense(<Contact />) },
      { path: "montanas", element: withSuspense(<Montanas />) },
      { path: "mapa", element: withSuspense(<Mapa />) },
      { path: "login", element: withSuspense(<Login />) },
      {
        path: "admin",
        element: (
          <ProtectedRoute>{withSuspense(<Admin />)}</ProtectedRoute>
        ),
      },
      {
        path: "newadventure",
        element: (
          <ProtectedRoute>{withSuspense(<NewAdventure />)}</ProtectedRoute>
        ),
      },
      { path: "*", element: withSuspense(<NotFound />) },
    ],
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
