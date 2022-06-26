import React from "react";
import "../styles/home.css";
import { useState, useEffect } from "react";
import useBookStore from "../store/BookStore.js";
import Navbar from "../components/navbar.js";
import Books from "../components/books.js";
import Footer from "../components/footer.js";
import { useNavigate } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import useUsers from "../store/users.js";
import { accessToken } from "../authProvider.js";

const Home = () => {
  const [token, setToken] = useState(null);
  const { books, fetchBook } = useBookStore((state) => state);
  const { user, fetchUser } = useUsers((state) => state);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // fetchBook(`${process.env.REACT_APP_API_BASE_URL}/books?page_id=0&limit=12`)
    const getBook = async () => {
      const url = `${process.env.REACT_APP_API_BASE_URL}/books?page_id=0&limit=12`;
      const book = await axios.get(url);
      setItems(book.data);
    };
    getBook();
    setToken(accessToken);

    setItems([...items].sort((a, b) => a.id - b.id));
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/books?page_id=${page}&limit=12`
    );
    return res;
  };

  const fetchData = async () => {
    try {
      setHasMore(false);
      const newBook = await fetchBooks();
      console.log("items", newBook.data);
      setItems([...items, ...newBook.data]);
      if (items.length === 0 || newBook.length < 12) {
        setHasMore(false);
      }
      setPage(page + 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="">
        <div className="flex justify-center ">
          <p className="text-2xl font-sans mt-[130px] mb-6">
            Buku-buku terbaru
          </p>
        </div>

        {!token && (
          <div className="flex justify-center ">
            <div
              className="grid grid-cols-2 gap-4 px-5 md:grid-cols-2 md:gap-4 
          lg:grid-cols-3 lg:gap-6 xl:grid-cols-4"
            >
              {items.map((element, index) => {
                return (
                  <Books
                    key={index}
                    id={element.id}
                    cover={
                      `${process.env.REACT_APP_API_BASE_URL}` +
                      element.cover_url
                    }
                    title={element.title}
                    category={element.categories}
                    author={element.author}
                    permalink={element.permalink}
                  />
                );
              })}
              <div className="sm:col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-4">
                <a
                  href={
                    process.env.REACT_APP_API_BASE_URL +
                    "/auth/google?redirect=" +
                    process.env.REACT_APP_API_REDIRECT_URL
                  }
                >
                  <p className="text-center text-xl text-slate-500 font-sans my-6">
                    Masuk untuk melihat lebih banyak
                  </p>
                </a>
              </div>
            </div>
          </div>
        )}
        {token && (
          <InfiniteScroll
            dataLength={items.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p className="my-5" style={{ textAlign: "center" }}>
                <b>Semua buku telah ditampilkan!</b>
              </p>
            }
          >
            <div className="flex justify-center ">
              <div
                className="grid grid-cols-2 gap-4 px-5 md:grid-cols-2 md:gap-4 
              lg:grid-cols-3 lg:gap-6 xl:grid-cols-4"
              >
                {items.map((element, index) => {
                  return (
                    <Books
                      key={index}
                      id={element.id}
                      cover={
                        `${process.env.REACT_APP_API_BASE_URL}` +
                        element.cover_url
                      }
                      title={element.title}
                      category={element.categories}
                      author={element.author}
                      permalink={element.permalink}
                    />
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
