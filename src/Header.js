import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Wordle Leaderboard</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
