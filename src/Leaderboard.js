import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
import Header from "./Header";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(7);

  useEffect(() => {
    setError(false);
    setInProgress(true);

    fetch(`https://api.wordle.kellenanker.com/leaderboard?limit=${limit}`)
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
      <Header />
      {error && <p>Oh no! Something went wrong!</p>}
      <Dropdown>
        <Dropdown.Toggle size="sm" variant="Primary">
          {limit === 0 ? "All time" : `Last ${limit} days`}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setLimit(7)}>7 days</Dropdown.Item>
          <Dropdown.Item onClick={() => setLimit(30)}>1 month</Dropdown.Item>
          <Dropdown.Item onClick={() => setLimit(60)}>2 months</Dropdown.Item>
          <Dropdown.Item onClick={() => setLimit(180)}>6 months</Dropdown.Item>
          <Dropdown.Item onClick={() => setLimit(365)}>1 year</Dropdown.Item>
          <Dropdown.Item onClick={() => setLimit(0)}>All time</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {(inProgress && <Spinner animation="border"></Spinner>) || (
        <Table style={{ textAlign: "left" }} striped bordered>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Number</th>
              <th>Avg. Guesses</th>
              <th>Win %</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e, i) => {
              const formattedNumber = `(${String(e.PhoneNumber).substring(
                0,
                3
              )}) ${String(e.PhoneNumber).substring(3, 6)}-${String(
                e.PhoneNumber
              ).substring(6)}`;
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <Link to={`/user/${e.PhoneNumber}`}>{formattedNumber}</Link>
                    {e.CurrentStreak > 2 && (
                      <span>{` (${e.CurrentStreak}🔥)`}</span>
                    )}
                  </td>
                  <td>{e.Average}</td>
                  <td>{e.WinPercentage}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Leaderboard;
