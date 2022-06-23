import React from "react";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import AuthorList from "../components/author.js";

const Author = () => (
  <div className="flex flex-col h-screen justify-between">
    <header className="h-10 bg-red-500">
      <Navbar />
    </header>
    <main className="mt-[100px] mb-auto h-10">
      <div className="flex justify-center">
        <a className=" text-xl text-slate-500 font-sans">Penulis</a>
      </div>
      <div className="flex justify-center">
        <AuthorList></AuthorList>
      </div>
    </main>
    <footer className=" bg-blue-500">
      <Footer />
    </footer>
  </div>
);

export default Author;
