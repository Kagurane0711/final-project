import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <Navbar />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <span className="text-7xl font-extrabold text-blue-600 mb-4">404</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
          Maaf, halaman yang Anda tuju tidak tersedia atau telah dipindahkan.
        </p>

        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;

