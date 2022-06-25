import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/navbar.js";
// import Books from "../components/books.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useBookStore from "../store/BookStore.js";
import axios from 'axios'

const Preview = () => {
  const [book, setBook] = useState([]);
  const { id, permalink } = useParams();
  const  books  = useBookStore((state) => state.books);
  
  useEffect(() => {
    const getBook = async () => {
      const url = `https://api.polin.probolinggokota.go.id/book/${id}`;
      const book = await axios.get(url);
      setBook(book.data);
    };
    getBook();
  }, []);

  console.log(books)
  return (
    <div>
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="grid place-items-center">
        <div className="grid grid-rows-6 grid-flow-col gap-8 h-[550px] w-[900px] mt-[130px]">
          <div className="row-span-4 border">
            <img src={"https://api.polin.probolinggokota.go.id" + book.cover_url} className="h-full m-auto" />
          </div>
          <div className="row-span-1">
            <p className="text-md font-medium">{book.title}</p>
          </div>
          <div className="flex row-span-1 justify-center pt-2.5">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Favorit
              </span>
            </button>
            <Link to={`/reader/${id}/${permalink}`}>
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Baca buku
                </span>
              </button>
            </Link>
          </div>
          <div className="relative row-span-1 col-span-2 p-5 border">
            <p className="absolute left-5">Penulis</p>
            <p className="absolute right-5"> {book.author}</p>
          </div>
          <div className="relative row-span-1 col-span-2 p-5 border">
            <p className="absolute left-5">Kategori</p>
            <p className="absolute right-5"> {book.categories + " "}</p>
          </div>
          <div className="relative row-span-1 col-span-2 p-5 border">
            <p className="absolute left-5">Tahun terbit</p>
            <p className="absolute right-5"> {book.year}</p>
          </div>
          <div className="row-span-3 col-span-2 p-3 border">
            <p>
              {book.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
