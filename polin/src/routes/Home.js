import React from "react";
import "../styles/home.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.js";
import Books from "../components/books.js";
import Footer from "../components/footer.js";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const Home = () => {
  const [isLogin, setLogin] = useState(true);

  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const fetchData = () => {
    try {
      // const data = await axios.get()
      // setItems(data.data)
    } catch (err) {
      console.error(err);
    }
  };

  const dataDummy = [
    {
      id: 1,
      cover:
        "https://cgtranslations321782266.files.wordpress.com/2020/07/p1alt2en.png",
      title: "Konosuba Vol. 17",
      category: "Light Novel",
      author: "Akatsuki Natsume",
    },
    {
      id: 2,
      cover:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Sangatsu_no_Lion.jpg/220px-Sangatsu_no_Lion.jpg",
      title: "Sangatsu no Lion",
      category: "Manga",
      author: "author",
    },
    {
      id: 3,
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1598798091l/54303330.jpg",
      title: "Kaguya-sama wa Kokurasetai",
      category: "Manga",
      author: "Akasaka Aka",
    },
    {
      id: 4,
      cover:
        "https://2.bp.blogspot.com/-JKtwCh6ttZA/YM732sQy-BI/AAAAAAAAMOA/jUSoTaG9JpQx5E_Ii5lsdgJYRoupwxy9gCLcBGAsYHQ/s1178-rw/oshi-no-ko.jpg",
      title: "Oshi no Ko",
      category: "manga",
      author: "Aka Akasaka",
    },
    {
      id: 5,
      cover:
        "https://cgtranslations321782266.files.wordpress.com/2020/07/p1alt2en.png",
      title: "Konosuba Vol. 17",
      category: "Light Novel",
      author: "Akatsuki Natsume",
    },
    {
      id: 6,
      cover:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Sangatsu_no_Lion.jpg/220px-Sangatsu_no_Lion.jpg",
      title: "Sangatsu no Lion",
      category: "Manga",
      author: "author",
    },
    {
      id: 7,
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1598798091l/54303330.jpg",
      title: "Kaguya-sama wa Kokurasetai",
      category: "Manga",
      author: "Akasaka Aka",
    },
    {
      id: 8,
      cover:
        "https://2.bp.blogspot.com/-JKtwCh6ttZA/YM732sQy-BI/AAAAAAAAMOA/jUSoTaG9JpQx5E_Ii5lsdgJYRoupwxy9gCLcBGAsYHQ/s1178-rw/oshi-no-ko.jpg",
      title: "Oshi no Ko",
      category: "manga",
      author: "Aka Akasaka",
    },
    {
      id: 9,
      cover:
        "https://cgtranslations321782266.files.wordpress.com/2020/07/p1alt2en.png",
      title: "Konosuba Vol. 17",
      category: "Light Novel",
      author: "Akatsuki Natsume",
    },
    {
      id: 10,
      cover:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Sangatsu_no_Lion.jpg/220px-Sangatsu_no_Lion.jpg",
      title: "Sangatsu no Lion",
      category: "Manga",
      author: "author",
    },
    {
      id: 11,
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1598798091l/54303330.jpg",
      title: "Kaguya-sama wa Kokurasetai",
      category: "Manga",
      author: "Akasaka Aka",
    },
    {
      id: 12,
      cover:
        "https://2.bp.blogspot.com/-JKtwCh6ttZA/YM732sQy-BI/AAAAAAAAMOA/jUSoTaG9JpQx5E_Ii5lsdgJYRoupwxy9gCLcBGAsYHQ/s1178-rw/oshi-no-ko.jpg",
      title: "Oshi no Ko",
      category: "manga",
      author: "Aka Akasaka",
    },
    {
      id: 13,
      cover:
        "https://cgtranslations321782266.files.wordpress.com/2020/07/p1alt2en.png",
      title: "Konosuba Vol. 17",
      category: "Light Novel",
      author: "Akatsuki Natsume",
    },
    {
      id: 14,
      cover:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Sangatsu_no_Lion.jpg/220px-Sangatsu_no_Lion.jpg",
      title: "Sangatsu no Lion",
      category: "Manga",
      author: "author",
    },
    {
      id: 15,
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1598798091l/54303330.jpg",
      title: "Kaguya-sama wa Kokurasetai",
      category: "Manga",
      author: "Akasaka Aka",
    },
    {
      id: 16,
      cover:
        "https://2.bp.blogspot.com/-JKtwCh6ttZA/YM732sQy-BI/AAAAAAAAMOA/jUSoTaG9JpQx5E_Ii5lsdgJYRoupwxy9gCLcBGAsYHQ/s1178-rw/oshi-no-ko.jpg",
      title: "Oshi no Ko",
      category: "manga",
      author: "Aka Akasaka",
    },
  ];

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
        <InfiniteScroll
          dataLength={items.length} //This is important fielementd to render the
          next={fetchData}
          hasMore={true}
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
              {dataDummy.map((element, index) => {
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
        {/* <div
          className="grid grid-cols-2 gap-4 px-5 md:grid-cols-3 md:gap-4 
        lg:grid-cols-3 lg:gap-6 lg:mx-[50px] xl:grid-cols-4 xl:mx-[110px] 2xl:mx-[125px]"
        > */}
        {/* {dataDummy.map((element, index) => {
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
          })} */}
        {/* <Books />
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
          <Books /> */}

        {/* </div> */}
        {!isLogin && (
          <div className="flex justify-center ">
            <Link to="/login">
              <p className="text-xl text-slate-500 font-sans my-6">
                Masuk untuk melementihat lebih banyak
              </p>
            </Link>
          </div>
        )}
        {isLogin && (
          <div className="flex justify-center ">
            {/* <p href="#" className="text-xl text-slate-500 font-sans my-6">
              Lihat selementengkapnya
            </p> */}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
