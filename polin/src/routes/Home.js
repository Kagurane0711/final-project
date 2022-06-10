import React from "react";
import "../styles/home.css";
import Navbar from "../components/navbar.js";
import Books from "../components/books.js";

const Home = () => (
  <div>
    <Navbar />
    <div className="books-container">
      <div className="grid grid-cols-4 gap-6">
        <Books />
        <Books />
        <Books />
        <Books />
        <Books />
        <Books />
        <Books />
        <Books />
      </div>
    </div>
  </div>
);

export default Home;
