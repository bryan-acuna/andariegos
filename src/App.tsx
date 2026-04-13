import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Montanas from "./pages/Montanas";
import "./App.css";
import Layout from "./pages/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ImageUploader from "./pages/ImageUploader";
import NewAdventure from "./pages/NewAdventure";
import About from "./pages/About";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "montanas", element: <Montanas /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <ImageUploader /> },
      { path: "newadventure", element: <NewAdventure /> },
      { path: "about", element: <About /> },
      { path: "admin", element: <Admin /> },
    ],
  },
]);

function App() {
  return (
    <>
<QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
