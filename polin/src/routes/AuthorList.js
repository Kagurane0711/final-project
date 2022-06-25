import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import Penulis from "../components/author.js";
import axios from "axios";


const Author = () => {
  const [author, setAuthors] = useState([]);

  const fetchAuthors = async () => {
    const res = await axios.get(`https://localhost:8080/books/authors`)
    setAuthors(res)
  }


  useEffect(() => {
    
  }, [])

  const authors = [
    { 
      id: "1",
      name: "John Doe",
      count: "10"
    },
    { 
      id: "2",
      name: "Jane",
      count: "10"
    },
  ]


  return(
  <div className="flex flex-col h-screen justify-between">
    <header className="h-10 bg-red-500">
      <Navbar />
    </header>
    <main className="mt-[100px] mb-auto h-10">
      <div className="flex justify-center">
        <a className=" text-xl text-slate-500 font-sans">Penulis</a>
      </div>
      <div className="flex justify-center">
        {authors.map((element, index) => {
            return (
            <Penulis
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

export default Author;
