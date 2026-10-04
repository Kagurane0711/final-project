import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import Books from "../components/books.js";
import { useParams } from "react-router-dom";
import { booksApi } from "../services/api.js";

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { type = "title", name = "" } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await booksApi.search(type, decodeURIComponent(name));
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Gagal melakukan pencarian:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, name]);

  const handleDeleteBook = (deletedId) => {
    setData((prev) => prev.filter((b) => b.id !== deletedId));
  };

  const getSearchTitle = () => {
    const decoded = decodeURIComponent(name);
    if (type === "category") return `Kategori: "${decoded}"`;
    if (type === "author") return `Penulis: "${decoded}"`;
    return `Pencarian: "${decoded}"`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <Navbar />
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Hasil {name ? getSearchTitle() : "Pencarian"}
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Ditemukan {data.length} buku
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-md mx-auto p-8">
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Tidak ada buku yang cocok dengan pencarian Anda.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Coba kata kunci lain atau periksa kembali ejaan Anda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((element) => (
              <Books
                key={element.id}
                id={element.id}
                cover={element.cover_url}
                title={element.title}
                category={element.categories}
                author={element.author}
                permalink={element.permalink}
                onDelete={handleDeleteBook}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;

