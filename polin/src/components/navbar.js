import React from "react";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import logoGoogle from "../assets/google-logo.png";
import SearchBar from "./search.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { Popover } from "@headlessui/react";
import { accessToken } from "../authProvider";

export default function Navbar() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(accessToken)
  }, []);

  // const newExpirationDate = () => {
  //   var expiration = new Date();
  //   expiration.setHours(expiration.getHours() + 1);
  //   return expiration;
  // };

  console.log(token)

  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-40 lg:flex-1 ">
            <Link to="/">
              <img
                className="h-10 w-auto sm:h-10"
                src={logo}
                alt="logo polin"
              />
            </Link>
            <div className="w-20 ml-7 py-2 ">
              <Link to="/Kategori">
                <p className="text-center text-slate-500">Kategori</p>
              </Link>
            </div>
            <div className="w-20 py-2">
              <Link to="/penulis">
                <p className="text-center text-slate-500">Penulis</p>
              </Link>
            </div>
          </div>
          {/* <select className="flex justify-start">
            <option value="title">Judul</option>
            <option value="author">Penulis</option>
            <option value="category">Kategori</option>
          </select> */}
          <div className="flex justify-center">
            {/* <div className="mb-0 xl:w-96">
              <input
                type="search"
                className="
        form-control block w-full m-0 px-3 py-1.5 text-base font-normal text-gray-700
        bg-white bg-clip-padding border border-solid border-gray-300
        rounded transition ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="search"
                onChange={handleSearch}
                placeholder="Cari"
              />
            </div> */}
            <SearchBar></SearchBar>
          </div>
          {!token && (
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <a href={process.env.REACT_APP_API_BASE_URL + "/auth/google?redirect=" + process.env.REACT_APP_API_REDIRECT_URL}>
                <button
                  // baca 2 access & refresh token dari query params
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-500 hover:bg-blue-600"
                >
                  Masuk dengan{" "}
                  <img
                    src={logoGoogle}
                    alt="google logo png"
                    className="w-[23px] ml-2"
                  />
                </button>
              </a>
            </div>
          )}
          {token && (
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link to="/profile">
                <span className="flex">
                  User
                  <img
                    src={logoGoogle}
                    alt="google logo png"
                    className="w-[23px] ml-2"
                  />
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Popover>
  );
}
