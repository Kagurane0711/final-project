import React, { useState } from "react";
import useBookStore from "../store/BookStore.js";

const Search = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

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

  return (
    <div className="flex justify-center">
      <div className="mb-0 xl:w-96">
        
        <input
          type="text"
          className="
        form-control block w-full m-0 px-3 py-1.5 text-base font-normal text-gray-700
        bg-white bg-clip-padding border border-solid border-gray-300
        rounded transition ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="search"
          onChange={handleFilter}
          placeholder="Cari"
        ></input>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={value.link} target="_blank">
                <p>{value.title} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
