import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { colors, formatNumber, formatName, wordleApi } from "./Constants";
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
              <h2>
                {formatName(data.CallerName) || formatNumber(data.PhoneNumber)}
                {data.CurrentStreak > 2 && (
                  <>
                    &nbsp;🔥
                    <span className="small text-muted">
                      {data.CurrentStreak}
                    </span>
                  </>
                )}
              </h2>
            </Row>
            <Row>
              <Col className="text-muted">
                Average<strong>&nbsp;{data.Average}</strong>
              </Col>
              <Col className="text-muted">
                Win<strong>&nbsp;{data.WinPercentage}%</strong>
              </Col>
            </Row>
            <Row>
              <Col className="text-muted">
                Total games<strong>&nbsp;{data.Puzzles.length}</strong>
              </Col>
              <Col className="text-muted">
                Longest🔥<strong>&nbsp;{data.LongestStreak}</strong>
              </Col>
            </Row>
          </Container>
          <Table bordered>
            <thead>
              <tr>
                <th className="col col-7">Wordle</th>
                <th className="col col-5">Guesses</th>
              </tr>
            </thead>
            <tbody>
              {data.Puzzles.map((wordle, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <Link
                        style={{ display: "block" }}
                        to={`/wordle/${wordle.PuzzleNumber}`}
                      >
                        {wordle.PuzzleNumber}
                      </Link>
                    </td>
                    <td
                      style={{
                        background: wordle.Victory
                          ? colors[wordle.Guesses - 1]
                          : colors[6],
                      }}
                    >
                      {wordle.Guesses}
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
