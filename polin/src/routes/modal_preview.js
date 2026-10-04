import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import { Link, useParams } from "react-router-dom";
import useUsers from "../store/users.js";
import { booksApi, getAssetUrl } from "../services/api.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Preview = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id, permalink } = useParams();
  const { addFavorite, removeFavorite, userFavorites, fetchFav } = useUsers();

  const isFavorite = userFavorites?.some((fav) => String(fav.id) === String(id));

  useEffect(() => {
    const getBook = async () => {
      try {
        setLoading(true);
        const res = await booksApi.getById(id);
        setBook(res.data);
      } catch (err) {
        console.error("Gagal memuat detail buku:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getBook();
      fetchFav();
    }
  }, [id, fetchFav]);

  const handleAddFav = async () => {
    try {
      await addFavorite(id);
      toast.success("Berhasil menambahkan ke favorit!");
    } catch (err) {
      toast.error("Gagal menambahkan favorit: " + (err.message || "Error"));
    }
  };

  const handleDelFav = async () => {
    try {
      await removeFavorite(id);
      toast.info("Berhasil menghapus dari favorit!");
    } catch (err) {
      toast.error("Gagal menghapus favorit: " + (err.message || "Error"));
    }
  };

  const readerUrl = `/reader/${id}${permalink ? `/${permalink}` : ""}`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <Navbar />
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : !book ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Buku tidak ditemukan
            </h2>
            <Link
              to="/"
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
            >
              Kembali ke Beranda
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Cover Column */}
              <div className="md:col-span-4 flex flex-col items-center">
                <div className="w-full max-w-[280px] aspect-[3/4] rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 mb-6 bg-gray-100">
                  <img
                    src={getAssetUrl(book.cover_url)}
                    alt={`Sampul ${book.title}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Actions */}
                <div className="w-full max-w-[280px] flex flex-col space-y-3">
                  <Link
                    to={readerUrl}
                    className="w-full text-center py-3 px-4 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-colors"
                  >
                    Mulai Membaca
                  </Link>

                  {!isFavorite ? (
                    <button
                      type="button"
                      onClick={handleAddFav}
                      className="w-full py-2.5 px-4 text-sm font-medium text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 rounded-xl transition-colors border border-blue-200"
                    >
                      + Tambah ke Favorit
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleDelFav}
                      className="w-full py-2.5 px-4 text-sm font-medium text-red-600 hover:text-white bg-red-50 hover:bg-red-600 rounded-xl transition-colors border border-red-200"
                    >
                      Hapus dari Favorit
                    </button>
                  )}
                </div>
              </div>

              {/* Details Column */}
              <div className="md:col-span-8 flex flex-col justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {book.title}
                  </h1>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                      <span className="block text-xs text-gray-500 dark:text-gray-400">
                        Penulis
                      </span>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {book.author || "-"}
                      </span>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                      <span className="block text-xs text-gray-500 dark:text-gray-400">
                        Kategori
                      </span>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {Array.isArray(book.categories)
                          ? book.categories.join(", ")
                          : book.categories || "-"}
                      </span>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                      <span className="block text-xs text-gray-500 dark:text-gray-400">
                        Tahun Terbit
                      </span>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {book.year || "-"}
                      </span>
                    </div>
                  </div>

                  {book.isbn && book.isbn !== "-" && (
                    <p className="text-xs text-gray-500 mt-3">
                      ISBN: <span className="font-medium text-gray-700 dark:text-gray-300">{book.isbn}</span>
                    </p>
                  )}

                  <div className="mt-6">
                    <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                      Sinopsis
                    </h2>
                    <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl text-sm leading-relaxed text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700 max-h-72 overflow-y-auto">
                      {book.description || book.summary || "Tidak ada deskripsi tersedia."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Preview;

