import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { colors, formatNumber, wordleApi } from "./Constants.js";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./Header";

const Puzzle = () => {
  const { puzzle } = useParams();
  const [data, setData] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setInProgress(true);

    fetch(`${wordleApi}/puzzle/${puzzle}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => {
        console.error(e);
        setError(true);
      })
      .finally(() => setInProgress(false));
  }, [puzzle]);

  return (
    <>
      <Header active="puzzles" />
      {error ? (
        <p>Oh no! Something went wrong!</p>
      ) : inProgress ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Container>
            <Row>
              <Col>
                <h2>Puzzle {data.PuzzleNumber}</h2>
              </Col>
            </Row>
          </Container>
          <Table style={{ textAlign: "left" }} bordered>
            <thead>
              <tr>
                <th>Number</th>
                <th>Guesses</th>
                <th>Victory?</th>
              </tr>
            </thead>
            <tbody>
              {data.Users &&
                data.Users.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <Link to={`/user/${e.PhoneNumber}`}>
                          {formatNumber(e.PhoneNumber)}
                        </Link>
                      </td>
                      <td
                        style={{
                          background: !e.Victory
                            ? "#F6BDC0"
                            : colors[e.Guesses],
                        }}
                      >
                        {e.Guesses}
                      </td>
                      <td>{e.Victory ? "✅" : "❌"}</td>
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

export default Puzzle;
