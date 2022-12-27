import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "./wordle.png";

const Header = () => {
  return (
    <Navbar bg="light">
      <Container>
        <Nav style={{ alignItems: "center" }}>
          <Navbar.Brand href="/">
            <img
              style={{ height: "2em", width: "2em" }}
              src={logo}
              alt="Home"
            />
          </Navbar.Brand>
          <Nav.Link href="/today">Today</Nav.Link>
          <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
          <Nav.Link href="/puzzles">Puzzles</Nav.Link>
          {/*<Nav.Link href="/users">Users</Nav.Link>*/}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
