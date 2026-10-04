import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import { booksApi } from "../services/api.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");
  const [summary, setSummary] = useState("");
  const [bookFile, setBookFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        setLoading(true);
        const res = await booksApi.getById(id);
        if (res.data) {
          setTitle(res.data.title || "");
          setAuthor(res.data.author || "");
          setCategory(
            Array.isArray(res.data.categories)
              ? res.data.categories[0]
              : res.data.categories || ""
          );
          setYear(res.data.year || "");
          setSummary(res.data.description || res.data.summary || "");
        }
      } catch (err) {
        console.error("Gagal memuat detail buku:", err);
        toast.error("Gagal memuat data buku untuk diedit.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookDetail();
    }
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.warn("Judul buku wajib diisi.");
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("title", title.trim());
      data.append("author", author);
      data.append("category", category);
      data.append("year", year);
      data.append("summary", summary);
      data.append("description", summary);

      if (bookFile) {
        data.append("book", bookFile);
      }
      if (coverImage) {
        data.append("cover_image", coverImage);
        data.append("coverImage", coverImage);
      }

      await booksApi.update(id, data);
      toast.success("Buku berhasil diperbarui!");
      setTimeout(() => {
        navigate(`/preview/${id}`);
      }, 1500);
    } catch (err) {
      console.error("Gagal memperbarui buku:", err);
      toast.error(
        "Gagal memperbarui buku: " + (err.response?.data?.message || err.message)
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <Navbar />
      </div>

      <ToastContainer position="top-center" autoClose={3000} />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Edit Data Buku
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Perbarui informasi buku dalam katalog
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Judul */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="judul"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Judul Buku <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="judul"
                    id="judul"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                {/* Penulis */}
                <div>
                  <label
                    htmlFor="penulis"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Penulis
                  </label>
                  <input
                    type="text"
                    name="penulis"
                    id="penulis"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                {/* Tahun Terbit */}
                <div>
                  <label
                    htmlFor="tahunTerbit"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Tahun Terbit
                  </label>
                  <input
                    type="text"
                    name="tahunTerbit"
                    id="tahunTerbit"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                {/* Kategori */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="kategori"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Kategori
                  </label>
                  <input
                    type="text"
                    name="kategori"
                    id="kategori"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                {/* Sinopsis */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="sinopsis"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Sinopsis
                  </label>
                  <textarea
                    name="sinopsis"
                    id="sinopsis"
                    rows={4}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                {/* Cover File */}
                <div>
                  <label
                    htmlFor="cover"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Ganti Cover (opsional)
                  </label>
                  <input
                    type="file"
                    name="cover"
                    id="cover"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                {/* Book File */}
                <div>
                  <label
                    htmlFor="buku"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Ganti File PDF (opsional)
                  </label>
                  <input
                    type="file"
                    name="buku"
                    id="buku"
                    accept="application/pdf"
                    onChange={(e) => setBookFile(e.target.files?.[0] || null)}
                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl shadow-sm transition-colors disabled:opacity-50"
                >
                  {submitting ? "Menyimpan..." : "Perbarui Buku"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UpdateBook;

