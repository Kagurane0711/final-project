import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import Penulis from "../components/author.js";
import axios from "axios";

const Author = () => {
  const [author, setAuthors] = useState([]);

  const fetchAuthors = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/books/authors`
    );
    setAuthors(res.data);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  console.log(author);

  return (
    <div className="flex flex-col h-screen justify-between">
      <header className="h-10 bg-red-500">
        <Navbar />
      </header>
      <main className="mt-[80px] mb-auto">
        <div className="flex justify-center">
          <a className=" text-xl text-slate-500 font-sans">Penulis</a>
        </div>
        <div className="flex justify-center">
          <div
            className="grid grid-cols-2 gap-4 px-5 md:grid-cols-2 md:gap-4 
          lg:grid-cols-3 lg:gap-6 xl:grid-cols-4"
          >
            {author.map((element, index) => {
              return (
                <Penulis
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
      <footer className="mt-3">
        <Footer />
      </footer>
    </div>
  );

};

export default Author;
