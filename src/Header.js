import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Header = () => {
  return (
    <Navbar bg="light">
      <Container>
        <Nav>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav.Link href="/today">Today</Nav.Link>
          <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
