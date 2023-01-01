import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { colors, formatNumber, wordleApi } from "./Constants.js";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./Header";

const Wordle = () => {
  const { wordle } = useParams();
  const [data, setData] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setInProgress(true);

    fetch(`${wordleApi}/wordle/${wordle}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => {
        console.error(e);
        setError(true);
      })
      .finally(() => setInProgress(false));
  }, [wordle]);

  return (
    <>
      <Header active="wordles" />
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
                  Wordle {data.PuzzleNumber}
                  <span className="small text-muted">&nbsp;{data.Answer}</span>
                </h2>
              </Col>
            </Row>
          </Container>
          <Table style={{ textAlign: "left" }} bordered>
            <thead>
              <tr>
                <th>User</th>
                <th>Guesses</th>
              </tr>
            </thead>
            <tbody>
              {data.Users &&
                data.Users.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <Link
                          style={{ display: "block" }}
                          to={`/user/${e.PhoneNumber}`}
                        >
                          {formatNumber(e.PhoneNumber)}
                        </Link>
                      </td>
                      <td
                        style={{
                          background: !e.Victory
                            ? colors[7]
                            : colors[e.Guesses],
                        }}
                      >
                        {e.Guesses}
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

export default Wordle;
