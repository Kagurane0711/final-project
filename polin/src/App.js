import React from "react";
import { Routes, Route} from "react-router-dom";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import "./App.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
