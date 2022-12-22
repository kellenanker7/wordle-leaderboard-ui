import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <h1>
      <Link to="/">Wordle Leaderboard</Link>
    </h1>
  );
};

export default Header;
