import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Header = ({ user }) => {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="/">Wordle Leaderboard</Navbar.Brand>
        {user && <Navbar.Brand href={`/user/${user}`}>{user}</Navbar.Brand>}
      </Container>
    </Navbar>
  );
};

export default Header;
