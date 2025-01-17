import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/home";
import Donner from "./pages/Donner";

import SearchDonnerPage from "./pages/SearchDonnerPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashBoard from "./pages/DashBoard";

import axios from "axios";
import UserDonation from "./pages/UserDonation";
import Profile from "./pages/Profile";
import DashBoardPage from "./pages/DashBoardPage";
import DonationCreate from "./pages/DonationCreate";
import MyDonations from "./pages/MyDonations";
import AllUsers from "./pages/AllUsers";

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
        path: "/DashBoard/:email",
        element: <DashBoardPage></DashBoardPage>,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "create-donation-request",
        element: <DonationCreate />,
      },
      {
        path: "my-donation-requests",
        element: <MyDonations />,
      },
      {
        path: "/DashBoard/AllUsers",
        element: <AllUsers />,
      },
    ],
  },
]);

export default router;
