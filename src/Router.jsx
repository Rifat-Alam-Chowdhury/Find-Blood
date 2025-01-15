import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/home";
import Donner from "./pages/Donner";

import SearchDonnerPage from "./pages/SearchDonnerPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashBoard from "./pages/DashBoard";
import UserDashboard from "./pages/UserDashboard";

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
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Register />,
      },
      {
        path: "/Search-donner",
        element: <SearchDonnerPage />,
      },
    ],
  },
  {
    path: "/DashBoard",
    element: <DashBoard />,
    children: [
      {
        path: "/DashBoard",
        element: <UserDashboard></UserDashboard>,
      },
    ],
  },
]);

export default router;
