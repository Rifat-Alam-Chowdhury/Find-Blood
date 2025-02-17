import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";

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
import AdminAllBloodDonation from "./pages/AdminAllBloodDonation";
import CheackAdmin from "./Protected/CheackAdmin";
import ContentManageMent from "./pages/ContentManageMent";
import CheackVolunteer from "./Protected/CheackVolunteer";
import BloodreqDetailsPage from "./pages/BloodreqDetailsPage";
import Privatefirebase from "./Protected/Privatefirebase";
import Blog from "./pages/Blog";
import BloodReqEditPage from "./components/BloodReqEditPage";
import Funding from "./pages/Funding";
import Payment from "./pages/Payment";

import TotalFunds from "./pages/TotalFunds";
import MyAppiledPosts from "./pages/MyAppiledPosts";
import FindDonner from "./pages/FindDonner";

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
        path: "/FindDonner",
        element: <FindDonner />,
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
      {
        path: "/Blogs",
        element: <Blog />,
      },
      {
        path: "/BloodreqDetailsPage",
        element: (
          <Privatefirebase>
            <BloodreqDetailsPage />
          </Privatefirebase>
        ),
      },
      {
        path: "Funding",
        element: (
          <Privatefirebase>
            <Payment />
          </Privatefirebase>
        ),
      },
    ],
  },
  {
    path: "DashBoard",
    element: (
      <Privatefirebase>
        <DashBoard />
      </Privatefirebase>
    ),
    children: [
      {
        path: "/DashBoard",
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
        path: "my-appiled-posts",
        element: <MyAppiledPosts />,
      },
      {
        path: "All-donation-requests",
        element: (
          <CheackAdmin>
            <AdminAllBloodDonation />,
          </CheackAdmin>
        ),
      },
      {
        path: "AllUsers",
        element: (
          <CheackAdmin>
            <AllUsers />
          </CheackAdmin>
        ),
      },
      {
        path: "content-management",
        element: (
          <CheackAdmin>
            <ContentManageMent />
          </CheackAdmin>
        ),
      },
      {
        path: "editBloodreq/:id",
        element: <BloodReqEditPage />,
      },
      {
        path: "TotalFunding",
        element: <TotalFunds />,
      },
    ],
  },
]);

export default router;
