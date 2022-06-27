import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import axios, { post } from "axios";
import FormData from "form-data";
import { useForm } from "react-hook-form";
import useUsers from "../store/users.js";

const Upload = () => {
  // const [formValues, setFormValues] = useState({});
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [isbn, setIsbn] = useState("-");
  const [description, setDescription] = useState("-");
  const [summary, setSummary] = useState("");
  const [publisher_id, setPublisher] = useState("ebook");
  const [author_id, setAuthor] = useState(1);
  const [category_ids, setCategory] = useState([1]);
  const [book, setBook] = useState(null);
  const [cover_image, setCoverImage] = useState(null);
  const { changeRole } = useUsers((state) => state);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year);
    formData.append("isbn", isbn);
    formData.append("description", description);
    formData.append("summary", summary);
    formData.append("publisher_id", publisher_id);
    formData.append("author_id", author_id);
    formData.append("category_ids", category_ids);
    formData.append("cover_image", cover_image);
    formData.append("book", book);

    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_BASE_URL}/admin/books/add`,
      data: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-type": "multipart/form-data",
        "Content-Disposition": "form-data",
        name: "body",
        // "Content-type": "application/octet-stream",
        boundary: "0cc175b9c0f1b6a831c399e269772661",
      },
    });
  };

  const handleCover = (cover) => {
    setCoverImage(cover);
  };

  const handleBook = (book) => {
    setBook(book);
  };

  // useEffect(() => {
  //    changeRole()
  // }, []);

  return (
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
                <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-gray-300 sm:p-6">
                      <div className="grid grid-cols-2 gap-6 h-[370px] w-[500px]">
                        <div className="col-span-1 ">
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Judul
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="col-span-1 ">
                          <label
                            htmlFor="author"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Penulis
                          </label>
                          <select
                            type="text"
                            name="author_id"
                            id="author_id"
                            onChange={(e) => setAuthor(e.target.value)}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value={1}>George Orwell</option>
                            <option value={2}>Charles Dickens</option>
                            <option value={3}>Lewis Caroll</option>
                            <option value={4}>Bram Stroker</option>
                            <option value={5}>Jane Austen</option>
                            <option value={6}>Charlotte Bronte</option>
                            <option value={7}>Sir Arthur Conan Dolye</option>
                            <option value={8}>Alexandre Dumas</option>
                            <option value={9}>H. G. Wells</option>
                            <option value={10}>Ngatmin Abbas</option>
                            <option value={11}>Sulistyowati</option>
                            <option value={12}>Budi Aryanto</option>
                          </select>
                        </div>
                        <div className="col-span-1 ">
                          <label
                            htmlFor="year"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tahun terbit
                          </label>
                          <input
                            type="text"
                            name="year"
                            id="year"
                            onChange={(e) => setYear(e.target.value)}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="col-span-1 ">
                          <label
                            htmlFor="category_ids"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Kategori
                          </label>
                          <select
                            name="category_ids"
                            id="category_ids"
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value={1}>Pendidikan</option>
                            <option value={2}>Klasik</option>
                            <option value={3}>Fiksi</option>
                            <option value={4}>Misteri</option>
                            <option value={5}>Fiksi Ilmiah</option>
                            <option value={6}>Fantasi</option>
                            <option value={7}>horor</option>
                            <option value={8}>Romansa</option>
                          </select>
                        </div>
                        <div className="col-span-2 ">
                          <label
                            htmlFor="summary"
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
                            htmlFor="cover_img"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Cover
                          </label>
                          <input
                            type="file"
                            name="cover_image"
                            id="cover_image"
                            onChange={(e) => handleCover(e.target.value[0])}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="col-span-2">
                          <label
                            htmlFor="book"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Buku
                          </label>
                          <input
                            type="file"
                            name="book"
                            id="book"
                            onChange={(e) => handleBook(e.target.value[0])}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <input
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
