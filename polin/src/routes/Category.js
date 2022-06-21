import React from "react";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";

const Category = () => (
  <div className="flex flex-col h-screen justify-between">
    <header className="h-10 bg-red-500">
      <Navbar />
    </header>
    <main className="mb-auto h-10 bg-green-500">
      
    </main>
    <footer className="h-10 bg-blue-500">
      <Footer />
    </footer>
  </div>
);

export default Category;
