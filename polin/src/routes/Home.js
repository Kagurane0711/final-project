import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/navbar.js";
import Books from "../components/books.js";
import Footer from "../components/footer.js";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAccessToken } from "../authProvider.js";
import { booksApi, getGoogleAuthUrl } from "../services/api.js";

const Home = () => {
  const [token, setToken] = useState(() => getAccessToken());
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Initial load
  useEffect(() => {
    setToken(getAccessToken());
    const loadInitialBooks = async () => {
      try {
        setLoading(true);
        const res = await booksApi.getAll(0, 12);
        const initialBooks = Array.isArray(res.data) ? res.data : [];
        setItems(initialBooks);
        if (initialBooks.length < 12) {
          setHasMore(false);
        }
        setPage(1);
      } catch (err) {
        console.error("Gagal memuat buku:", err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialBooks();
  }, []);

  const fetchMoreData = useCallback(async () => {
    try {
      const res = await booksApi.getAll(page, 12);
      const newBooks = Array.isArray(res.data) ? res.data : [];

      if (newBooks.length === 0) {
        setHasMore(false);
        return;
      }

      setItems((prev) => {
        // Prevent duplicate books if page indices overlap
        const existingIds = new Set(prev.map((b) => b.id));
        const filteredNew = newBooks.filter((b) => !existingIds.has(b.id));
        return [...prev, ...filteredNew];
      });

      if (newBooks.length < 12) {
        setHasMore(false);
      }

      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      console.error("Gagal memuat buku tambahan:", err);
      setHasMore(false);
    }
  }, [page]);

  const handleDeleteBook = (deletedId) => {
    setItems((prev) => prev.filter((b) => b.id !== deletedId));
  };

  const renderBookGrid = () => (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
      {items.map((element) => (
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
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <Navbar />
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Buku-Buku Terbaru
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Jelajahi berbagai koleksi buku digital terbaru di Polin
          </p>
        </div>

        {loading && items.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Belum ada buku tersedia.</p>
          </div>
        ) : !token ? (
          <div>
            {renderBookGrid()}
            <div className="mt-12 text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Ingin membaca lebih banyak?
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Masuk dengan akun Google Anda untuk mengakses seluruh koleksi dan fitur favorit.
              </p>
              <a
                href={getGoogleAuthUrl()}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-colors"
              >
                Masuk dengan Google
              </a>
            </div>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center my-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            }
            endMessage={
              <p className="my-8 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                Semua buku telah ditampilkan!
              </p>
            }
          >
            {renderBookGrid()}
          </InfiniteScroll>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;

