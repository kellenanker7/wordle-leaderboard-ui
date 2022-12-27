import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { colors, formatNumber, wordleApi } from "./Constants.js";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./Header";

const limitOpts = [
  { val: 7, txt: "week" },
  { val: 30, txt: "month" },
  { val: 365, txt: "year" },
  { val: 0, txt: "all time" },
];

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [limit, setLimit] = useState({ val: 7, txt: "week" });

  useEffect(() => {
    setError(false);
    setInProgress(true);

    fetch(`${wordleApi}/leaderboard?limit=${limit.val}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => {
        setError(true);
        console.error(e);
      })
      .finally(() => setInProgress(false));
  }, [limit]);

  return (
    <>
      <Header active="leaderboard" />
      {error ? (
        <p>Oh no! Something went wrong!</p>
      ) : inProgress ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Container>
            <Row>
              <Col>
                <Dropdown>
                  <Dropdown.Toggle size="sm" variant="Primary">
                    {limit.val === 0 ? "All time" : `Last ${limit.txt}`}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {limitOpts.map((e, i) => {
                      return (
                        <Dropdown.Item key={i} onClick={() => setLimit(e)}>
                          {e.txt}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Container>
          <Table style={{ textAlign: "left" }} bordered>
            <thead>
              <tr>
                <th>Number</th>
                <th>Average</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <Link to={`/user/${e.PhoneNumber}`}>
                          {formatNumber(e.PhoneNumber)}
                        </Link>
                        {e.CurrentStreak > 2 && (
                          <span className="small text-muted">
                            &nbsp;&nbsp;&nbsp;{`🔥${e.CurrentStreak}`}
                          </span>
                        )}
                      </td>
                      <td style={{ background: colors[Math.floor(e.Average)] }}>
                        {e.Average}
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

export default Leaderboard;
