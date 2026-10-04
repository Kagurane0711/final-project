import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import CategoryList from "./routes/CategoryList";
import AuthorList from "./routes/AuthorList";
import Login from "./routes/Login";
import Preview from "./routes/modal_preview";
import Reader from "./routes/Reader";
import Upload from "./routes/Upload";
import UpdateBook from "./routes/UpdateBook";
import SearchPage from "./routes/SearchPage";
import NotFound from "./routes/NotFound";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/kategori" element={<CategoryList />} />
      <Route path="/penulis" element={<AuthorList />} />

      {/* Book details preview */}
      <Route path="/preview/:id/:permalink" element={<Preview />} />
      <Route path="/preview/:id" element={<Preview />} />

      {/* Book reader */}
      <Route path="/reader/:id/:permalink" element={<Reader />} />
      <Route path="/reader/:id" element={<Reader />} />

      {/* Search */}
      <Route path="/search/:type/:name" element={<SearchPage />} />
      <Route path="/search" element={<SearchPage />} />

      {/* Admin management */}
      <Route path="/upload" element={<Upload />} />
      <Route path="/update/:id/:permalink" element={<UpdateBook />} />
      <Route path="/update/:id" element={<UpdateBook />} />

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

