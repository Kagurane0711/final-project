import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import { booksApi } from "../services/api.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Upload = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [isbn, setIsbn] = useState("");
  const [summary, setSummary] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [bookFile, setBookFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [authorsRes, categoriesRes] = await Promise.all([
          booksApi.getAuthors(),
          booksApi.getCategories(),
        ]);

        if (Array.isArray(authorsRes.data)) {
          setAuthors(authorsRes.data);
          if (authorsRes.data.length > 0) {
            setAuthorId(authorsRes.data[0].id);
          }
        }
        if (Array.isArray(categoriesRes.data)) {
          setCategories(categoriesRes.data);
          if (categoriesRes.data.length > 0) {
            setCategoryId(categoriesRes.data[0].id);
          }
        }
      } catch (err) {
        console.error("Gagal memuat metadata buku:", err);
      }
    };

    fetchMetadata();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.warn("Judul buku wajib diisi.");
      return;
    }

    if (!coverImage) {
      toast.warn("File cover buku wajib dipilih.");
      return;
    }

    if (!bookFile) {
      toast.warn("File PDF buku wajib dipilih.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("year", year);
      formData.append("isbn", isbn || "-");
      formData.append("description", summary || "-");
      formData.append("summary", summary || "-");
      formData.append("publisher_id", "ebook");
      formData.append("author_id", authorId);
      formData.append("category_ids", categoryId);
      formData.append("cover_image", coverImage);
      formData.append("book", bookFile);

      await booksApi.add(formData);
      toast.success("Buku berhasil diupload!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error("Gagal upload buku:", err);
      toast.error(
        "Gagal mengunggah buku: " + (err.response?.data?.message || err.message)
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
            Upload Buku Baru
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Tambahkan buku digital baru ke dalam koleksi perpustakaan Polin
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Judul */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Judul Buku <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Belajar Pemrograman Web"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              {/* Penulis */}
              <div>
                <label
                  htmlFor="author_id"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Penulis
                </label>
                <select
                  name="author_id"
                  id="author_id"
                  value={authorId}
                  onChange={(e) => setAuthorId(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {authors.length > 0 ? (
                    authors.map((auth) => (
                      <option key={auth.id} value={auth.id}>
                        {auth.name}
                      </option>
                    ))
                  ) : (
                    <option value="1">Penulis Default</option>
                  )}
                </select>
              </div>

              {/* Kategori */}
              <div>
                <label
                  htmlFor="category_ids"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Kategori
                </label>
                <select
                  name="category_ids"
                  id="category_ids"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))
                  ) : (
                    <option value="1">Pendidikan</option>
                  )}
                </select>
              </div>

              {/* Tahun Terbit */}
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Tahun Terbit
                </label>
                <input
                  type="text"
                  name="year"
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Contoh: 2023"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              {/* ISBN */}
              <div>
                <label
                  htmlFor="isbn"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  ISBN
                </label>
                <input
                  type="text"
                  name="isbn"
                  id="isbn"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  placeholder="Contoh: 978-602-xxx-x"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              {/* Sinopsis */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="sinopsis"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Sinopsis / Deskripsi
                </label>
                <textarea
                  name="sinopsis"
                  id="sinopsis"
                  rows={4}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Tulis ringkasan singkat isi buku..."
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              {/* Cover File */}
              <div>
                <label
                  htmlFor="cover_image"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  File Cover (JPG/PNG) <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="cover_image"
                  id="cover_image"
                  accept="image/*"
                  onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {/* Book File */}
              <div>
                <label
                  htmlFor="book"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  File Buku (PDF) <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="book"
                  id="book"
                  accept="application/pdf"
                  onChange={(e) => setBookFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl shadow-sm transition-colors disabled:opacity-50"
              >
                {submitting ? "Mengunggah..." : "Simpan Buku"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Upload;

