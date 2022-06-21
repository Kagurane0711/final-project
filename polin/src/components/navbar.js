/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import logoGoogle from "../assets/google-logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { Popover, Transition } from "@headlessui/react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [query, setQuery] = useState("");

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  useEffect(() => {
    handleTokenFromQueryParams();
  }, []);


  // const createGoogleAuthLink = async () => {
  //   try {
  //     const request = await fetch("http://localhost:8080/auth/google", {
  //       method: "GET",
  //     });
  //     // const request = await axios.get("http://localhost:8080/auth/google")
  //     const response = await request.json();
  //     window.location.href = response.url;
  //   } catch (error) {
  //     console.log("App.js 12 | error", error);
  //     throw new Error("Issue with Login", error.message);
  //   }
  // };

  const handleTokenFromQueryParams = () => {
    const query = new URLSearchParams(window.location.search);
    const accessToken = query.get("access_token");
    const refreshToken = query.get("refresh_token");
    console.log(accessToken, refreshToken)
    const expirationDate = newExpirationDate();
    console.log("App.js 30 | expiration Date", expirationDate);
    if (accessToken && refreshToken) {
      storeTokenData(accessToken, refreshToken, expirationDate);
      setIsLoggedIn(true);
    }
  };

  const newExpirationDate = () => {
    var expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    return expiration;
  };

  const storeTokenData = async (token, refreshToken, expirationDate) => {
    sessionStorage.setItem("accessToken", token);
    sessionStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("expirationDate", expirationDate);
  };

  const signOut = () => {
    setIsLoggedIn(false);
    sessionStorage.clear();
  };

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
              <Link to="/Kategori">
                <p className="text-center text-slate-500">Penulis</p>
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="mb-0 xl:w-96">
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
            </div>
          </div>
          {!isLoggedIn && (
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <a href="http://localhost:8080/auth/google?redirect=http://localhost:3000/">
                <button
                  // onClick={window.location.href = `http://localhost:8080/auth/google?redirect=http://localhost:3000/auth/success`}   
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
          {isLoggedIn && (
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link to="/profile">
                <span className="flex">
                  Fachri R
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
