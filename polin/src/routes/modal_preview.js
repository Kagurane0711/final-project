import React, { useState } from "react";
import Navbar from "../components/navbar.js";
// import Books from "../components/books.js";
import { Link } from "react-router-dom";

const Preview = () => {

  const [detail, setDetail] = useState(null)

  return (
  <div>
    <div className="fixed w-full">
      <Navbar />
    </div>
    <div className="grid place-items-center">
      <div className="grid grid-rows-6 grid-flow-col gap-8 h-[550px] w-[900px] mt-[130px]">
        <div className="row-span-4 border">
          <img
            src="https://cgtranslations321782266.files.wordpress.com/2020/07/p1alt2en.png"
            className="h-full m-auto"
          />
        </div>
        <div className="row-span-1">
          <p className="text-md font-medium">Konosuba Vol. 17</p>
        </div>
        <div className="flex row-span-1 justify-center pt-2.5">
          <Link to="/reader">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Baca buku
              </span>
            </button>
          </Link>
        </div>
        <div className="relative row-span-1 col-span-2 p-5 border">
          <p className="absolute left-5">Penulis</p>
          <p className="absolute right-5"> Akatsuki Natsume</p>
        </div>
        <div className="relative row-span-1 col-span-2 p-5 border">
          <p className="absolute left-5">Penerbit</p>
          <p className="absolute right-5"> Shōsetsuka ni Narō</p>
        </div>
        <div className="relative row-span-1 col-span-2 p-5 border">
          <p className="absolute left-5">Tanggal terbit</p>
          <p className="absolute right-5"> May 1, 2020</p>
        </div>
        <div className="row-span-3 col-span-2 p-3 border">
          <p>
            Now Kazuma is grumbling that he's being treated the same as usual by
            the girls despite him being the hero who saved the world. He said he
            was too soft on the girls and they let it get to their heads. As
            he's heading out he starts stretching in preparation to make the
            girls cry again (same business as usual). Eris smiles as she
            imagines the usual everyday scenario that would occur again between
            Kazuma's party. She asks him not to be too hard on them. On Kazuma's
            way out, Eris, who lamented that he wasn't rewarded properly in
            return for his astronomical achievement (defeating the Demon King
            despite his terrible class, stats and his dysfunctional party),
            asked him to wait. She wished him fortune and gave him her sincere
            prayer from the bottom of her heart ("Blessing!").
          </p>
        </div>
      </div>
    </div>
  </div>
  )
};

export default Preview;
