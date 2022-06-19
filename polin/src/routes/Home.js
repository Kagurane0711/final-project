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

const Home = () => {
  const [isLogin, setLogin] = useState(false);
  const books = useBookStore((state) => state.books);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [noMore, setNoMore] = useState(false);

  const fetchData = () => {
    try {
      // const data = await axios.get()
      // setItems(data.data)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                  // <Link key={index} to={`/preview/${element.id}`}>
                  // <div key={index} onClick={() => navigate(`/preview/${element.id}`)}>
                  <Books
                    key={index}
                    id={element.id}
                    cover={element.cover}
                    title={element.title}
                    category={element.category}
                    author={element.author}
                  />
                  // </div>
                  // </Link>
                );
              })}
              <div className="col-span-4">
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
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
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
                    // <Link key={index} to={`/preview/${element.id}`}>
                    // <div key={index} onClick={() => navigate(`/preview/${element.id}`)}>
                    <Books
                      key={index}
                      id={element.id}
                      cover={element.cover}
                      title={element.title}
                      category={element.category}
                      author={element.author}
                    />
                    // </div>
                    // </Link>
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
