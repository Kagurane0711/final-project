import React, { useState, useEffect } from "react";
import useBookStore from "../store/BookStore.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Search = () => {
  const [type, setType] = useState("title");
  const [term, setTerm] = useState("");
  const { books, fetchBook } = useBookStore((state) => state);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  const handleSumbit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`/search/${type}/${term}`);
  };

  return (
    <div>
      <form onSubmit={handleSumbit}>
        <div className="flex">
          <select
            defaultValue={"default"}
            onChange={(e) => setType(e.target.value)}
            className="flex justify-start z-10 w-44 bg-white rounded-l-lg divide-y divide-gray-100 border"
          >
            <option value="title">Judul</option>
            <option value="author">Penulis</option>
            <option value="category">Kategori</option>
          </select>

          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 rounded-r-lg border-l-gray-50 border-l-2 border dark:border dark:placeholder-gray-600"
              placeholder="Cari"
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 "
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
