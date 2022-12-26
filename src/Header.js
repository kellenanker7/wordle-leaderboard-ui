import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Header = ({ user }) => {
  return (
    <Navbar bg="light">
      <Container>
        <Nav>
          <Navbar.Brand href="/">Leaderboard</Navbar.Brand>
          <Nav.Link href="/today">Today's puzzle</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
