import React from "react";
import { Link } from "react-router-dom";
import Preview from "../routes/modal_preview"

export default function Books() {
  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <Link to="/preview">
      <a href="#">
        <img
          className="rounded-t-lg w-25"
          src="https://cgtranslations321782266.files.wordpress.com/2020/07/p1alt2en.png"
          alt=""
        />
      </a>
      </Link>
      <div className="p-5">
        <Link to="/preview">
        <a>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Konosuba Vol. 17
          </h5>
        </a>
        </Link>
        <p className="text-gray-700 dark:text-gray-400">Penulis : Akatsuki Natsume</p>
        <p className="mb-3 text-gray-700 dark:text-gray-400">Penerbit :</p>
      </div>
    </div>
  );
}
