import React, { useState } from "react";
import { Link } from "react-router-dom";
import Preview from "../routes/modal_preview";
import { IoPencil } from "react-icons/io5";

export default function Books({ id, cover, title, category, author, permalink }) {
  const role = useState("admin");

  return (
    <div className="max-w-[280px] bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/preview/${id}/${permalink}`}>
        <img
          className="rounded-t-lg h-[375px] w-[285px]"
          src={cover}
          alt=""
        />
      </Link>
      <div className="p-5">
        <Link to={`/preview/${id}/${permalink}`}>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>
        <p className="text-gray-700 dark:text-gray-400">
          Penulis : {author}
        </p>
        <p className="text-gray-700 dark:text-gray-400">
          Kategori : {category + " "}
        </p>
        <div className="flex justify-center">
          {/* {role && ( */}
          {/* <button className="inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Edit
            </span>
          </button>
          <button className="inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
            <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Delete
            </span>
          </button> */}
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
