import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.js";
import Books from "../components/books.js";
import { Link } from "react-router-dom";
import { logout } from "../authProvider";
import useUsers from "../store/users.js";
import axios from 'axios'
import { accessToken } from "../authProvider.js"

const Profile = () => {
  const { user, fetchUser } = useUsers((state) => state);
  const [isAdmin, setAdmin] = useState(false);
  const [token, setToken] = useState(null);
  const [fav, setFav] = useState([]);

  useEffect(() => {
    fetchUser(`${process.env.REACT_APP_API_BASE_URL}/user/profile`);
    const getFav = async () => {
      const url = `${process.env.REACT_APP_API_BASE_URL}/user/favorites`;
      const favorites = await axios.get(url);
      setFav(favorites.data);
    };
    getFav();
  }, []);

  const changeUser = () => {
    if (isAdmin === false) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  } 

  console.log("user", user.picture);
  console.log("fav", fav);

  return (
    <div>
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="flex justify-center">
        <div className="container mt-[90px] my-5 p-5">
          <div className="md:flex no-wrap md:-mx-2 ">
            {/* <!-- Left Side --> */}
            <div className="w-full md:w-3/12 md:mx-2">
              {/* <!-- Profile Card --> */}
              <div className="bg-white p-3 border-t-4 border-green-400">
                <div className="image overflow-hidden">
                  <img
                    className="h-auto w-full mx-auto"
                    src={user.picture}
                    alt="Foto profile"
                  />
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 mt-5 my-1">
                  {user.given_name + " " + user.family_name}
                </h1>
              </div>
              <div className="flex justify-center">
                <label
                  for="default-toggle"
                  class="inline-flex relative items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value=""
                    id="default-toggle"
                    class="sr-only peer"
                    onChange={changeUser}
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-600">
                    Admin
                  </span>
                </label>
              </div>
              <div className="flex justify-center pt-2.5">
                {isAdmin && (
                  <Link to="/upload">
                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Upload
                      </span>
                    </button>
                  </Link>
                )}
                <Link to="/">
                  <button
                    onClick={logout}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Sign out
                    </span>
                  </button>
                </Link>
              </div>
              
              {/* <!-- End of profile card --> */}
              <div className="my-4"></div>
            </div>
            {/* <!-- Right Side --> */}
            <div className="w-full md:w-9/12 mx-2 h-64">
              {/* <!-- Profile tab --> */}
              {/* <!-- Favourite Section --> */}
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500"></span>
                  <span className="tracking-wide text-md">Favorit</span>
                </div>
                <div height={300} className=" text-gray-700 m-0">
                  <Books className="" />
                </div>
              </div>
              {/* <!-- End of about section --> */}
              {/* Bookmark section  */}
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500"></span>
                  <span className="tracking-wide">Bookmark</span>
                </div>
                <div className="text-gray-700">
                  <Books className="" />
                </div>
              </div>
              <div className="my-4"></div>
              {/* End of bookmark  */}
              {/* <!-- End of profile tab --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
