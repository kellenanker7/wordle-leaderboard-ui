import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Leaderboard from "./js/Leaderboard";
import Today from "./js/Today";
import User from "./js/User";
import Wordles from "./js/Wordles";
import Wordle from "./js/Wordle";
import About from "./js/About";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Today />} />
        <Route path="/leaderboard" exact element={<Leaderboard />} />
        <Route path="/user/:user" element={<User />} />
        <Route path="/wordles" element={<Wordles />} />
        <Route path="/wordle/:wordle" element={<Wordle />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
