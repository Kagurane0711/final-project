import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";

const Upload = () => (
  <div>
    <div className="fixed w-full">
      <Navbar />
    </div>
    <div className="flex flex-col h-screen justify-between">
      <main className="mb-auto mt-[100px] h-10">
        <div className="mt-10 sm:mt-0">
        <div className="flex justify-center ">
      <a href="#" className="text-xl text-slate-600 font-sans my-4">
        Upload Buku
      </a>
    </div>
          <div className="flex justify-center">
            <div className="flex justify-center mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-gray-300 sm:p-6">
                    <div className="grid grid-cols-2 gap-6 h-[370px] w-[500px]">
                      <div className="col-span-1 ">
                        <label
                          htmlFor="judul"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Judul
                        </label>
                        <input
                          type="text"
                          name="judul"
                          id="judul"
                          autoComplete="Judul"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-1 ">
                        <label
                          htmlFor="penulis"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Penulis
                        </label>
                        <input
                          type="text"
                          name="penulis"
                          id="penulis"
                          autoComplete="Penulis"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-1 ">
                        <label
                          htmlFor="penulis"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tahun terbit
                        </label>
                        <input
                          type="text"
                          name="tahunTerbit"
                          id="tahunTerbit"
                          autoComplete="Tahun Terbit"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-1 ">
                        <label
                          htmlFor="kategori"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Kategori
                        </label>
                        <input
                          type="text"
                          name="kategori"
                          id="kategori"
                          autoComplete="Kategori"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-2 ">
                        <label
                          htmlFor="kategori"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Sinopsis
                        </label>
                        <input
                          type="text"
                          name="sinopsis"
                          id="sinopsis"
                          autoComplete="sinopsis"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="buku"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Cover
                        </label>
                        <input
                          type="file"
                          name="cover"
                          id="cover"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="buku"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Buku
                        </label>
                        <input
                          type="file"
                          name="buku"
                          id="buku"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <footer className="h-19">
        <Footer />
      </footer>
    </div>
  </div>
);

export default Upload;
