import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Kategori from "./routes/Category";
import Login from "./routes/Login";
import Preview from "./routes/modal_preview";
import Reader from "./routes/Reader";
import Upload from "./routes/Upload";
import "./App.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/kategori" element={<Kategori />} />
        <Route path="/login" element={<Login />} />
        <Route path="/preview" element={<Preview />}>
          <Route path=":id" element={<Preview />} />
        </Route>
        <Route path="/reader" element={<Reader />}>
          <Route path=":id" element={<Reader />} />
        </Route>
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </>
  );
};

export default App;