import React from "react";
import "../styles/home.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.js";
import Books from "../components/books.js";
import Footer from "../components/footer.js";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios"

const Home = () => {
  const [isLogin, setLogin] = useState(true);

  const [items, setItems] = useState([])

  const fetchData = () => {
    try {
      // const data = await axios.get()
      // setItems(data.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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

        <div
          className="grid grid-cols-2 gap-4 px-5 md:grid-cols-3 md:gap-4 
        lg:grid-cols-3 lg:gap-6 lg:mx-[50px] xl:grid-cols-4 xl:mx-[110px] 2xl:mx-[125px]"
        >
          {/* <Books 
            key={index}

          /> */}
          <Books />
          <Books />
          <Books />
          <Books />
          <Books />
          <Books />
          <Books />
          <Books />
          <Books />
          <Books />
          <Books />
          <Books />
          <InfiniteScroll
            dataLength={items.length} //This is important field to render the
            next={fetchData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage=
            {
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            >{items}
          </InfiniteScroll>
        </div>
        {!isLogin && (
          <div className="flex justify-center ">
            <Link to="/login">
              <p className="text-xl text-slate-500 font-sans my-6">
                Masuk untuk melihat lebih banyak
              </p>
            </Link>
          </div>
        )}
        {isLogin && (
          <div className="flex justify-center ">
            {/* <p href="#" className="text-xl text-slate-500 font-sans my-6">
              Lihat selengkapnya
            </p> */}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
