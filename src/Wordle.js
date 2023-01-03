import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { colors, formatNumber, formatName, wordleApi } from "./Constants.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
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
              <h2>
                Wordle {data.PuzzleNumber}
                <span className="small text-muted">
                  &nbsp;{data.Answer ? data.Answer : "🤫"}
                  {data.Answer && data.Definitions.length > 0 && (
                    <>
                      &nbsp;
                      <OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        rootClose
                        overlay={
                          <Popover>
                            <Popover.Header as="h3">Definitions</Popover.Header>
                            <Popover.Body>
                              <Table>
                                <tbody>
                                  {data.Definitions &&
                                    data.Definitions.map((e, i) => (
                                      <tr key={i}>
                                        <td>{e.part_of_speech}</td>
                                        <td>
                                          <ul>
                                            {e.definitions.map((n, m) => (
                                              <li key={m}>{n}</li>
                                            ))}
                                          </ul>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </Table>
                            </Popover.Body>
                          </Popover>
                        }
                      >
                        <FontAwesomeIcon icon={faCircleQuestion} size="xs" />
                      </OverlayTrigger>
                    </>
                  )}
                </span>
              </h2>
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
                data.Users.map((e, i) => (
                  <tr key={i}>
                    <td>
                      <Link
                        style={{ display: "block" }}
                        to={`/user/${e.PhoneNumber}`}
                      >
                        {formatName(e.CallerName) ||
                          formatNumber(e.PhoneNumber)}
                      </Link>
                    </td>
                    <td
                      style={{
                        background: e.Victory
                          ? colors[e.Guesses - 1]
                          : colors[7],
                      }}
                    >
                      {e.Guesses}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default Wordle;
