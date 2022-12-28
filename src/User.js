import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
                <h2>
                  {formatNumber(user)}
                  {data.CurrentStreak > 2 && (
                    <>
                      &nbsp;🔥
                      <span className="small text-muted">
                        {data.CurrentStreak}
                      </span>
                    </>
                  )}
                </h2>
              </Col>
            </Row>
            <Row>
              <Col>
                Longest streak:<strong>&nbsp;🔥{data.LongestStreak}</strong>
              </Col>
              <Col>
                Win:<strong>&nbsp;{data.WinPercentage}%</strong>
              </Col>
            </Row>
          </Container>
          <Table bordered>
            <thead>
              <tr>
                <th>Puzzle</th>
                <th>Guesses</th>
              </tr>
            </thead>
            <tbody>
              {data.Puzzles.map((puzzle, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <Link to={`/puzzle/${puzzle.PuzzleNumber}`}>
                        {puzzle.PuzzleNumber}
                      </Link>
                    </td>
                    <td
                      style={{
                        background: !puzzle.Victory
                          ? "#F6BDC0"
                          : colors[puzzle.Guesses],
                      }}
                    >
                      {puzzle.Guesses}
                    </td>
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
