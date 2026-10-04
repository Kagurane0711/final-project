import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import CategoryCard from "../components/category.js";
import { booksApi } from "../services/api.js";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await booksApi.getCategories();
        setCategories(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Gagal memuat kategori:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <Navbar />
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Daftar Kategori
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Temukan buku berdasarkan topik dan genre yang Anda minati
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Tidak ada kategori ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {categories.map((cat, index) => (
              <CategoryCard
                key={cat.id || index}
                name={cat.name || cat}
                count={cat.count}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryList;

