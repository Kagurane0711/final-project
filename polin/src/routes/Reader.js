import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import Navbar from "../components/navbar.js";
import { useParams, Link } from "react-router-dom";
import { booksApi, getAssetUrl } from "../services/api.js";

export default function Reader() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getBook = async () => {
      try {
        setLoading(true);
        const res = await booksApi.getById(id);
        setBook(res.data);
      } catch (err) {
        console.error("Gagal memuat buku:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getBook();
    }
  }, [id]);

  useEffect(() => {
    if (pageNumber) {
      sessionStorage.setItem("pageNumber", String(pageNumber));
    }
  }, [pageNumber]);

  function onDocumentLoadSuccess({ numPages: loadedNumPages }) {
    setNumPages(loadedNumPages);
    setPageNumber(1);
  }

  function changePage(offSet) {
    setPageNumber((prevPageNumber) => {
      const next = prevPageNumber + offSet;
      if (next < 1) return 1;
      if (numPages && next > numPages) return numPages;
      return next;
    });
  }

  const pdfUrl = book?.url ? getAssetUrl(book.url) : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <Navbar />
      </header>

      <main className="flex-1 flex flex-col items-center p-4">
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : !pdfUrl ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 max-w-md my-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
              File buku belum tersedia
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Buku ini belum memiliki file PDF yang diunggah.
            </p>
            <Link
              to="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
            >
              Kembali ke Beranda
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-4xl flex flex-col items-center my-4">
            {/* Header info */}
            <div className="w-full flex items-center justify-between mb-4 px-2">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white truncate max-w-md">
                {book.title}
              </h2>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Halaman {pageNumber} dari {numPages || "..."}
              </div>
            </div>

            {/* Document display */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden p-2 sm:p-4 flex justify-center">
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="py-20 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    Memuat halaman PDF...
                  </div>
                }
                error={
                  <div className="py-12 text-center text-red-500 text-sm">
                    Gagal memuat dokumen PDF. Pastikan file valid dan dapat diakses.
                  </div>
                }
              >
                <Page
                  pageNumber={pageNumber}
                  scale={1.2}
                  className="shadow-sm"
                  renderAnnotationLayer={false}
                />
              </Document>
            </div>

            {/* Pagination Controls */}
            <div className="inline-flex items-center space-x-4 mt-6 bg-white dark:bg-gray-800 px-6 py-2 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
              <button
                type="button"
                disabled={pageNumber <= 1}
                onClick={() => changePage(-1)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pageNumber <= 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
                }`}
              >
                &larr; Sebelumnya
              </button>

              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {pageNumber} / {numPages || 1}
              </span>

              <button
                type="button"
                disabled={Boolean(numPages && pageNumber >= numPages)}
                onClick={() => changePage(1)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  numPages && pageNumber >= numPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
                }`}
              >
                Selanjutnya &rarr;
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

