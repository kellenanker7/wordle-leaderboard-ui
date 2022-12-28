import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { colors, formatNumber, wordleApi } from "./Constants.js";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
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
  const [limit, setLimit] = useState({ val: 30, txt: "month" });

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
          <Dropdown>
            <Dropdown.Toggle size="md" variant="Primary">
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
          <Table style={{ textAlign: "left" }} bordered>
            <thead>
              <tr>
                <th className="col col-8">User</th>
                <th className="col col-2">Average</th>
                <th className="col col-2">Streak</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((e, i) => {
                  if (e.Wins.length >= 3) {
                    return (
                      <tr key={i}>
                        <td>
                          <Link to={`/user/${e.PhoneNumber}`}>
                            {formatNumber(e.PhoneNumber)}
                          </Link>
                        </td>
                        <td
                          style={{ background: colors[Math.floor(e.Average)] }}
                        >
                          {e.Average}
                        </td>
                        <td>
                          {e.CurrentStreak > 2 && "🔥"}
                          {e.CurrentStreak}
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default Leaderboard;
