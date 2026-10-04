import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import AuthorCard from "../components/author.js";
import { booksApi } from "../services/api.js";

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true);
        const res = await booksApi.getAuthors();
        setAuthors(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Gagal memuat penulis:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <Navbar />
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Daftar Penulis
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Jelajahi karya-karya dari berbagai penulis ternama
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : authors.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Tidak ada penulis ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {authors.map((element, index) => (
              <AuthorCard
                key={element.id || index}
                name={element.name || element}
                count={element.count}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AuthorList;

