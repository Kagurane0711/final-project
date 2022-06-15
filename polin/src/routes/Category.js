import React from "react";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";

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
    <Footer className="h-10"/>
  </div>
);

export default Category;
