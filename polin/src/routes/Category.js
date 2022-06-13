import React from "react";
import Navbar from "../components/navbar.js";

const Category = () => (
  <div>
    <div className="fixed w-full">
      <Navbar />
    </div>
    <div className="flex justify-center ">
      <a href="#" className="text-xl text-slate-500 font-sans my-6">
        Kategori
      </a>
    </div>
  </div>
);

export default Category;
