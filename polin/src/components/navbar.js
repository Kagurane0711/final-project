/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";

export default function Navbar() {
  const [isLogin, setLogin] = useState(false);

  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-40 lg:flex-1 ">
            <Link to="/">
              <img className="h-10 w-auto sm:h-10" src={logo} alt="" />
            </Link>
          </div>
          <div>
            <Link to="/Kategori" className="">
              <p className="text-slate-500">Kategori</p>
            </Link>
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
                placeholder="Cari"
              />
            </div>
          </div>
          {!isLogin && (
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link to="/login">
                <p className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-500 hover:bg-blue-600">
                  Masuk dengan <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" alt="google logo png" className ="w-[23px] ml-2" /> 
                </p>
              </Link>
            </div>
          )}
          {isLogin && (
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link to="/profile">
                {/* <span>Fachri R</span> */}
                <p className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Profile
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Popover>
  );
}
