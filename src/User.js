import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { colors, formatNumber, wordleApi } from "./Constants.js";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./Header";

const User = () => {
  const { user } = useParams();
  const [data, setData] = useState({
    LongestStreak: 0,
    CurrentStreak: 0,
    Puzzles: [],
  });
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    setError(false);
    setInProgress(true);

    fetch(`${wordleApi}/user/${user}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => {
        console.error(e);
        setError(true);
      })
      .finally(() => setInProgress(false));
  }, [user]);

  return (
    <>
      <Header active="users" />
      {error ? (
        <p>Oh no! Something went wrong!</p>
      ) : inProgress ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Container>
            <Row>
              <Col>
                <h2>{formatNumber(user)}</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                Current streak: {data.CurrentStreak}
                {data.CurrentStreak > 2 && "🔥"}
              </Col>
              <Col>
                Longest streak: {data.LongestStreak}
                {data.LongestStreak > 2 && "🔥"}
              </Col>
            </Row>
          </Container>
          <Table bordered>
            <thead>
              <tr>
                <th>Puzzle</th>
                <th>Guesses</th>
                <th>Victory?</th>
              </tr>
            </thead>
            <tbody>
              {data.Puzzles.map((puzzle, i) => {
                return (
                  <tr key={i}>
                    <td>{puzzle.PuzzleNumber}</td>
                    <td
                      style={{
                        background: !puzzle.Victory
                          ? "#F6BDC0"
                          : colors[puzzle.Guesses],
                      }}
                    >
                      {puzzle.Guesses}
                    </td>
                    <td>{puzzle.Victory ? "✅" : "❌"}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default User;
