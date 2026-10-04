import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="p-4 bg-white border-t border-gray-100 shadow-sm md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-700">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © {currentYear}{" "}
        <Link to="/" className="hover:underline font-semibold">
          Polin™
        </Link>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 space-x-4 md:space-x-6">
        <li>
          <Link to="/" className="hover:underline">
            Beranda
          </Link>
        </li>
        <li>
          <Link to="/kategori" className="hover:underline">
            Kategori
          </Link>
        </li>
        <li>
          <Link to="/penulis" className="hover:underline">
            Penulis
          </Link>
        </li>
        <li>
          <a
            href="https://github.com/rg-km/final-project-engineering-9"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
        </li>
      </ul>
    </footer>
  );
}

