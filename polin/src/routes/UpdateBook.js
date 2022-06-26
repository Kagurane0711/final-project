import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import { useParams } from "react-router-dom";
import axios from "axios"

const Upload = () => {
  const [book, setBook] = useState(null);
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [year, setYear] = useState('')
  const [summary, setSummary] = useState('')
  const [coverImage, setCoverImage] = useState(null)
  const { id } = useParams('')

  const handleFormSubmit = async () => {
    const data = new FormData()
    data.append("title", title)
    data.append("author", author)
    data.append("category", category)
    data.append("year", year)
    data.append("summary", summary)
    data.append("book", book)
    data.append("coverImage", coverImage)

    await axios
    .post(`${process.env.REACT_APP_API_BASE_URL}/admin/books/add`, data)
    .then((res) => {console.log(res)})
    .catch((err) => {console.log(err)})
  };

  return (
    <div>
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div class="flex flex-col h-screen justify-between">
        <main className="mb-auto mt-[100px] h-10">
          <div className="mt-10 sm:mt-0">
            <div className="flex justify-center ">
              <a href="#" className="text-xl text-slate-600 font-sans my-4">
                Update book
              </a>
            </div>
            <div className="flex justify-center">
              <div className="flex justify-center mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleFormSubmit} method="POST">
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
                            onChange={(e) => setTitle(e.target.value)}
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
                            onChange={(e) => setAuthor(e.target.value)}
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
                            onChange={(e) => setYear(e.target.value)}
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
                          <select
                            // type="text"
                            name="kategori"
                            id="kategori"
                            // onchange={(e) => setCategory(e.target.value)}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value="ccomedy">Komedi</option>
                            <option value="action">Aksi</option>
                            <option value="horror">Horor</option>
                          </select>
                        </div>
                        <div className="col-span-2 ">
                          <label
                            htmlFor="kategori"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Sinopsis
                          </label>
                          <textarea
                            type="text"
                            name="sinopsis"
                            id="sinopsis"
                            onChange={(e) => setSummary(e.target.value)}
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
                            onChange={(e) => setCoverImage(e.target.value)}
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
                            onChange={(e) => setBook(e.target.value)}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <input
                        // onClick={handleFormSubmit}
                        type="submit"
                        value="Submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      />
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
};

export default Upload;
