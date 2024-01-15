import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { colors, formatNumber, formatName, wordleApi } from "./Constants";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Header from "./Header";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [today, setToday] = useState(0);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    setError(false);
    setInProgress(true);

    Promise.all([
      fetch(`${wordleApi}/leaderboard`).then((res) => res.json()),
      fetch(`${wordleApi}/today`).then((res) => res.json()),
    ])
      .then(([leaderboard, today]) => {
        setLeaderboard(leaderboard);
        setToday(today.PuzzleNumber);
      })
      .catch((e) => {
        setError(true);
        console.error(e);
      })
      .finally(() => setInProgress(false));
  }, []);

  return (
    <>
      <Header active="leaderboard" />
      {error ? (
        <p>Oh no! Something went wrong!</p>
      ) : inProgress ? (
        <Spinner animation="border" />
      ) : (
        <Table style={{ textAlign: "left" }} bordered>
          <thead>
            <tr>
              <th className="col col-8">User</th>
              <th className="col col-2">Average</th>
              <th className="col col-2">Streak</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard &&
              leaderboard
                .filter((e) => {
                  const lastNWins = e.Wins.slice(0, 7);
                  return lastNWins.length >= 3 && lastNWins[2] > today - 7;
                })
                .map((e, i) => (
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
                        background: colors[Math.floor(e.Average) - 1],
                      }}
                    >
                      {e.Average}
                    </td>
                    <td>
                      {e.CurrentStreak > 2
                        ? `🔥${e.CurrentStreak}`
                        : e.CurrentStreak < 1
                        ? "-"
                        : e.CurrentStreak}
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Leaderboard;
