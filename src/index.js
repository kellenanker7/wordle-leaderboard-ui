import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Leaderboard from "./Leaderboard";
import Today from "./Today";
import Users from "./Users";
import User from "./User";
import Puzzles from "./Puzzles";
import Puzzle from "./Puzzle";
import reportWebVitals from "./reportWebVitals";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Today />} />
        <Route path="/today" exact element={<Today />} />
        <Route path="/leaderboard" exact element={<Leaderboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:user" element={<User />} />
        <Route path="/puzzles" element={<Puzzles />} />
        <Route path="/puzzle/:puzzle" element={<Puzzle />} />
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
