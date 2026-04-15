import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Montanas from "./pages/Montanas";
import "./App.css";
import Layout from "./pages/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./components/Toast";
import ImageUploader from "./pages/ImageUploader";
import NewAdventure from "./pages/NewAdventure";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Mapa from "./pages/Mapa";
import { AuthProvider } from "./context/Authcontext";
import { useAuth } from "./hooks/useAuth";
import type { JSX } from "react";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { session, loading } = useAuth();
  if (loading) return null;
  return session ? children : <Navigate to="/register" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "montanas", element: <Montanas /> },
      { path: "contact", element: <Contact /> },
      {
        path: "login",
        element: (
          <ProtectedRoute>
            <ImageUploader />
          </ProtectedRoute>
        ),
      },
      { path: "newadventure", element: <NewAdventure /> },
      { path: "about", element: <About /> },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        ),
      },
      { path: "mapa", element: <Mapa /> },
      { path: "register", element: <Login /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
