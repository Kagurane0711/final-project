import React, { useState, useEffect } from "react";
import useBookStore from "../store/BookStore.js";
import axios from "axios";

const Search = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [type, setType] = useState("");

  const { books, fetchBook } = useBookStore((state) => state);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = books.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  useEffect(() => {
    const fetchBook = async () => {
      const res = await axios.get(
        `https://api.polin.probolinggokota.go.id/books/search?type=${type}`
      );
    };
  }, []);

  return (
    // <div className="flex justify-center">
    //   <div className="mb-0 xl:w-96">

    //     <input
    //       type="text"
    //       className="
    //     form-control block w-full m-0 px-3 py-1.5 text-base font-normal text-gray-700
    //     bg-white bg-clip-padding border border-solid border-gray-300
    //     rounded transition ease-in-out
    //     focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
    //       id="search"
    //       onChange={handleFilter}
    //       placeholder="Cari"
    //     ></input>
    //   </div>
    //   {filteredData.length != 0 && (
    //     <div className="dataResult">
    //       {filteredData.slice(0, 15).map((value, key) => {
    //         return (
    //           <a className="dataItem" href={value.link} target="_blank">
    //             <p>{value.title} </p>
    //           </a>
    //         );
    //       })}
    //     </div>
    //   )}
    // </div>
    <div>
      <form>
        <div className="flex">
          <label
            htmlFor="search-dropdown"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Your Email
          </label>
          {/* <button
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
          >
            Kategori{" "}
            <svg
              className="ml-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button> */}
          {/* <div
            id="dropdown"
            className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
            data-popper-reference-hidden=""
            data-popper-escaped=""
            data-popper-placement="top"
            style={{
              position: "absolute",
              inset: "auto, auto, 0px, 0px",
              margin: "0px",
              transform: "translated(897px, 5637px, 0px)",
            }}
          > */}
          <select 
          className="flex justify-start z-10 w-44 bg-white rounded-l-lg divide-y divide-gray-100 border">
            <option value="title">Judul</option>
            <option value="author">Penulis</option>
            <option value="category">Kategori</option>
          </select>
          {/* </div> */}
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 rounded-r-lg border-l-gray-50 border-l-2 border dark:border dark:placeholder-gray-600"
              placeholder="Cari"
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
