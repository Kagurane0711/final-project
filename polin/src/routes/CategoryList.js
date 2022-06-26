import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import Kategori from "../components/category.js";
import axios from "axios";

import { useParams } from "react-router-dom";


const Category = () => {
  const [category, setCategory] = useState([]);

  const fetchCategories = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/books/categories`
    );
    setCategory(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  return (
    <div className="flex flex-col h-screen justify-between">
      <header className="h-10 bg-red-500">
        <Navbar />
      </header>
      <main className="mt-[80px] mb-auto h-10">
        <div className="flex justify-center">
          <a className=" text-xl text-slate-500 font-sans">Kategori</a>
        </div>

        <div className="flex justify-center">
          <div
            className="grid grid-cols-2 gap-4 px-5 md:grid-cols-2 md:gap-4 
          lg:grid-cols-3 lg:gap-6 xl:grid-cols-4"
          >
            {category.map((element, index) => {
              return (
                <Kategori
                  key={index}
                  id={element.id}
                  name={element.name}
                  count={element.count}
                />
              );
            })}
          </div>
        </div>

      </main>
      {/* <footer className=" bg-blue-500"> */}
      <Footer />
      {/* </footer> */}
    </div>
  );
};

export default Category;
