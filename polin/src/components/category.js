import React from "react";
import { Link } from "react-router-dom";

export default function category({name}) {
  return (
    <div className="grid p-4">
      <Link to={`/search/category/${name}`}>
      <div className="p-8 rounded-xl shadow-md">
        <h4 className="mb-2 text-lg font-semibold">{name}</h4>
      </div>
      </Link>
    </div>
  );
}