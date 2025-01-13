import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/home";
import Donner from "./pages/Donner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/donner",
        element: <Donner />,
      },
    ],
  },
]);

export default router;
