import React from "react";

export default function category({name}) {
  return (
    <div className="lg:w-1/3 md:w-1/2 w-full p-4">
      <div className="p-8 rounded-xl shadow-md">
        <h4 className="mb-2 text-lg font-semibold">{name}</h4>
      </div>
    </div>
  );
}
