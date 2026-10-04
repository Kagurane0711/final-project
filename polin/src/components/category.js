import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ name, count }) {
  return (
    <div className="p-2">
      <Link
        to={`/search/category/${encodeURIComponent(name)}`}
        className="block p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-center group dark:bg-gray-800 dark:border-gray-700"
      >
        <h4 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors dark:text-white">
          {name}
        </h4>
        {count !== undefined && count !== null && (
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 inline-block">
            {count} buku
          </span>
        )}
      </Link>
    </div>
  );
}