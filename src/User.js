import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { colors } from "./Constants.js";
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
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState(false);
  const formattedNumber = `(${String(user).substring(0, 3)}) ${String(
    user
  ).substring(3, 6)}-${String(user).substring(6)}`;

  useEffect(() => {
    setError(false);
    setInProgress(true);

    fetch(`https://api.wordle.kellenanker.com/user/${user}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => {
        setError(true);
        console.error(e);
      })
      .finally(() => setInProgress(false));
  }, [user]);

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <h2>{formattedNumber}</h2>
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
      {error && <p>Oh no! Something went wrong!</p>}
      {(inProgress && <Spinner animation="border"></Spinner>) || (
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
      )}
    </>
  );
};

export default User;
