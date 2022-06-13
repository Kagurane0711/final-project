import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Kategori from "./routes/Category";
import Login from "./routes/Login";
import Preview from "./routes/modal_preview";
import Reader from "./routes/Reader";
import "./App.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="kategori" element={<Kategori />} />
        <Route path="login" element={<Login />} />
        <Route path="preview" element={<Preview />} />
        <Route path="reader" element={<Reader />} />
      </Routes>
    </>
  );
};

export default App;
