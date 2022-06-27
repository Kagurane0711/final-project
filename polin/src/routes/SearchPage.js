import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import Books from "../components/books.js";
import Kategori from "../components/category.js";
import axios from "axios";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const [data, setData] = useState([]);
  const type = useParams();

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/books/search?type=${type.type}&term=${type.name}`
    const res = await axios.get(url);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-between">
      <header className="h-10 bg-red-500">
        <Navbar />
      </header>
      <main className="mt-[80px] mb-auto">
        <div className="flex justify-center mb-5">
          <a className=" text-xl text-slate-500 font-sans">Hasil</a>
        </div>
        <div className="flex justify-center">
          <div
            className="grid grid-cols-2 gap-4 px-5 md:grid-cols-2 md:gap-4 
          lg:grid-cols-3 lg:gap-6 xl:grid-cols-4"
          >
            {data.map((element, index) => {
              return (
                <Books
                  key={index}
                  id={element.id}
                  cover={
                    "https://api.polin.probolinggokota.go.id" +
                    element.cover_url
                  }
                  title={element.title}
                  category={element.categories}
                  author={element.author}
                  permalink={element.permalink}
                />
              );
            })}
          </div>
        </div>
      </main>
      <footer className="mt-7">
      <Footer />
      </footer>
    </div>
  );
};

export default SearchPage;
