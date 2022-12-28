import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "./wordle.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const Header = ({ active }) => {
  return (
    <Navbar bg="light">
      <Container>
        <Nav defaultActiveKey="/" style={{ alignItems: "center" }}>
          <Navbar.Brand href="/">
            <img
              style={{ height: "2em", width: "2em" }}
              src={logo}
              alt="Home"
            />
          </Navbar.Brand>
          <Nav.Link
            className={active === "leaderboard" ? "active" : ""}
            href="/leaderboard"
          >
            Leaderboard
          </Nav.Link>
          <Nav.Link
            className={active === "puzzles" ? "active" : ""}
            href="/puzzles"
          >
            Puzzles
          </Nav.Link>
          <Nav.Link
            className={active === "users" ? "active" : ""}
            href="/users"
          >
            Users
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link
            className={active === "about" ? "active" : ""}
            href="/about"
          >
            <FontAwesomeIcon icon={faCircleInfo} />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
