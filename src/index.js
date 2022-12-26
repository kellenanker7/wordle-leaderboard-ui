import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Leaderboard from "./Leaderboard";
import Today from "./Today";
import User from "./User";
import reportWebVitals from "./reportWebVitals";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Today />} />
        <Route path="/today" exact element={<Today />} />
        <Route path="/Leaderboard" exact element={<Leaderboard />} />
        <Route path="/user/:user" element={<User />} />
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
