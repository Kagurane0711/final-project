import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import Kategori from "../components/category.js";
import axios from 'axios'

const Category = () => {
  const [category, setCategory] = useState([]);

  const fetchCategories = async () => {
    const res = await axios.get(`https://localhost:8080/books/categories`)
    setCategory(res)
  }

  useEffect(() => {
    // fetchCategories()
  }, [])

  const categories = [
    { 
      id: "1",
      name: "action",
      count: "10"
    },
    { 
      id: "2",
      name: "Horor",
      count: "10"
    },
    { 
      id: "3",
      name: "Komedi",
      count: "10"
    },
  ]

  return (
    <div className="flex flex-col h-screen justify-between">
      <header className="h-10 bg-red-500">
        <Navbar />
      </header>
      <main className="mt-[100px] mb-auto h-10">
        <div className="flex justify-center">
          <a className=" text-xl text-slate-500 font-sans">Kategori</a>
        </div>
        <div className="flex justify-center">
          {categories.map((element, index) => {
            return (
            <Kategori
            key={index}
            id={element.id}
            name={element.name}
            count={element.count}
            />
            )
          })}
        </div>
      </main>
      <footer className=" bg-blue-500">
        <Footer />
      </footer>
    </div>
  );
};

export default Category;
