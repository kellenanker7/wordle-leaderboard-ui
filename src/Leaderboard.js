import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { colors } from "./Constants.js";
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
  const [inProgress, setInProgress] = useState(true);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState({ val: 7, txt: "week" });

  useEffect(() => {
    setError(false);
    setInProgress(true);

    fetch(`https://api.wordle.kellenanker.com/leaderboard?limit=${limit.val}`)
      .then((res) => res.json())
      .then((data) => {
        return data.ok ? setData(data) : setError(true);
      })
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
                  const formattedNumber = `(${String(e.PhoneNumber).substring(
                    0,
                    3
                  )}) ${String(e.PhoneNumber).substring(3, 6)}-${String(
                    e.PhoneNumber
                  ).substring(6)}`;
                  return (
                    <tr key={i}>
                      <td>
                        <Link to={`/user/${e.PhoneNumber}`}>
                          {formattedNumber}
                        </Link>
                        {e.CurrentStreak > 2 && (
                          <span className="small text-muted">
                            {` 🔥${e.CurrentStreak}`}
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
