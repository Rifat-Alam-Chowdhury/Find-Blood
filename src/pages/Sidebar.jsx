import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AUthfirebase } from "../Auth/AuthApi";

function Sidebar({ data }) {
  const { role } = data || {};
  const { user } = useContext(AUthfirebase);
  console.log(data.role);

  const AdminView = (
    <>
      <li>
        <Link>User</Link>
      </li>

      <li>
        <Link>Menu</Link>
      </li>
      <li>
        <Link>volunteer</Link>
      </li>
    </>
  );

  return (
    <div className="border-2 border-red-700 h-screen w-20 lg:w-80">
      {/* controls */}
      <div className="flex flex-col">
        <Link to={"/DashBoard/profile"}>Profile</Link>
        <Link to={`donation/${user?.email}`}>Donation</Link>
        {role === "admin" && AdminView}
      </div>
    </div>
  );
}

export default Sidebar;
