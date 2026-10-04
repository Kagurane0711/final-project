import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [type, setType] = useState("title");
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = term.trim();
    if (!trimmed) return;
    navigate(`/search/${type}/${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex rounded-lg shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent overflow-hidden">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-gray-50 text-gray-700 text-xs sm:text-sm px-3 py-2 border-r border-gray-300 focus:outline-none"
          aria-label="Kategori pencarian"
        >
          <option value="title">Judul</option>
          <option value="author">Penulis</option>
          <option value="category">Kategori</option>
        </select>

        <div className="relative flex-1 flex">
          <input
            type="search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="block w-full px-3 py-2 text-xs sm:text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none"
            placeholder="Cari buku, penulis, kategori..."
            required
          />
          <button
            type="submit"
            className="px-4 text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center focus:outline-none"
            aria-label="Cari"
          >
            <svg
              className="w-4 h-4"
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
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;

