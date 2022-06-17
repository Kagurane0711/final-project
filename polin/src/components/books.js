import React from "react";
import { Link } from "react-router-dom";
import Preview from "../routes/modal_preview";

export default function Books({ id, cover, title, category, author }) {
  return (
    <div className="max-w-[280px] bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/preview/${id}`}>
        <img
          className="rounded-t-lg h-[375px] w-[285px]"
          // src="https://cgtranslations321782266.files.wordpress.com/2020/07/p1alt2en.png"
          src={cover}
          alt=""
        />
      </Link>
      <div className="p-5">
        <Link to="/preview">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {/* Konosuba Vol. 17 */}
            {title}
          </h5>
        </Link>
        <p className="text-gray-700 dark:text-gray-400">
          {/* Penulis : Akatsuki Natsume */}
          Penulis : {author}
        </p>
        <p className="text-gray-700 dark:text-gray-400">
          {/* Penulis : Akatsuki Natsume */}
          Kategori : {category}
        </p>

      </div>
    </div>
  );
}
