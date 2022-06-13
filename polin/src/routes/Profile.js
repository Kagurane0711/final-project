import React from "react";
import Navbar from "../components/navbar.js";

const Profile = () => {
  return (
    <div>
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="flex justify-center ">
        <a href="#" className="text-xl text-slate-500 font-sans my-6">
          Profile
        </a>
      </div>
    </div>
  );
};

export default Profile;
