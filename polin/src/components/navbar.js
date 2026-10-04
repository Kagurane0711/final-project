import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import logoGoogle from "../assets/google-logo.png";
import SearchBar from "./search.js";
import useUsers from "../store/users.js";
import { getAccessToken } from "../authProvider";
import { getGoogleAuthUrl } from "../services/api";

export default function Navbar() {
  const [token, setToken] = useState(() => getAccessToken());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, fetchUser } = useUsers();

  useEffect(() => {
    const currentToken = getAccessToken();
    setToken(currentToken);
    if (currentToken && !user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:space-x-8">
          {/* Logo & Main Nav */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center flex-shrink-0">
              <img className="h-9 w-auto" src={logo} alt="Polin Logo" />
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                to="/kategori"
                className="text-slate-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Kategori
              </Link>
              <Link
                to="/penulis"
                className="text-slate-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Penulis
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-4">
            <SearchBar />
          </div>

          {/* Auth / Profile Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {!token ? (
              <a
                href={getGoogleAuthUrl()}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <span>Masuk dengan</span>
                <img
                  src={logoGoogle}
                  alt="Google"
                  className="w-5 h-5 ml-2 bg-white rounded-full p-0.5"
                />
              </a>
            ) : (
              <Link
                to="/profile"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <span className="text-sm font-medium">
                  {user?.given_name || "Profil"}
                </span>
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt="Foto Profil"
                    className="w-9 h-9 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                    {user?.given_name ? user.given_name.charAt(0) : "U"}
                  </div>
                )}
              </Link>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Menu"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/kategori"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            Kategori
          </Link>
          <Link
            to="/penulis"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            Penulis
          </Link>
          <div className="pt-2 border-t border-gray-100">
            {!token ? (
              <a
                href={getGoogleAuthUrl()}
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <span>Masuk dengan Google</span>
                <img
                  src={logoGoogle}
                  alt="Google"
                  className="w-5 h-5 ml-2 bg-white rounded-full p-0.5"
                />
              </a>
            ) : (
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                {user?.picture && (
                  <img
                    src={user.picture}
                    alt="Foto Profil"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span>{user?.given_name ? `${user.given_name} (Profil)` : "Profil"}</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

