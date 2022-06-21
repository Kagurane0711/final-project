import React from "react";
import "../styles/home.css";
import { useState, useEffect } from "react";
import useBookStore from "../store/BookStore.js";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.js";
import Books from "../components/books.js";
import Footer from "../components/footer.js";
import { useNavigate } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import useUsers from "../store/users.js"

const Home = () => {
  const [isLogin, setLogin] = useState(true);
  const {books, fetchBook} = useBookStore((state) => state);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [noMore, setNoMore] = useState(false);
  const {user, fetchUser} = useUsers((state) => state)

  const fetchData = () => {
    try {
      // const data = await axios.get()
      // setItems(data.data)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBook("http://localhost:8080/books")
    
  }, []);

  console.log()

  return (
    <div>
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="">
        <div className="flex justify-center ">
          <p className="text-2xl font-sans mt-[130px] mb-6">
            Paling banyak dibaca
          </p>
        </div>

        {!isLogin && (
          <div className="flex justify-center ">
          <div
            className="grid grid-cols-2 gap-4 px-5 md:grid-cols-2 md:gap-4 
          lg:grid-cols-3 lg:gap-6 xl:grid-cols-4"
          >
            {books.map((element, index) => {
              return (
                <Books
                  key={index}
                  id={element.id}
                  cover={element.cover}
                  title={element.title}
                  category={element.category}
                  author={element.author}
                />
              );
            })}
              <div className="sm:col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-4">
                <Link to="/login">
                  <p className="text-center text-xl text-slate-500 font-sans my-6">
                    Masuk untuk melihat lebih banyak
                  </p>
                </Link>
              </div>
            </div>
          </div>
        )}
        {isLogin && (
          <InfiniteScroll
            dataLength={items.length} //This is important fielementd to render the
            next={fetchData}
            hasMore={noMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p className="my-5" style={{ textAlign: "center" }}>
                <b >Semua buku telah ditampilkan!</b>
              </p>
            }
          >
            <div className="flex justify-center ">
              <div
                className="grid grid-cols-2 gap-4 px-5 md:grid-cols-2 md:gap-4 
              lg:grid-cols-3 lg:gap-6 xl:grid-cols-4"
              >
                {books.map((element, index) => {
                  return (
                    <Books
                      key={index}
                      id={element.id}
                      cover={element.cover}
                      title={element.title}
                      category={element.category}
                      author={element.author}
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
