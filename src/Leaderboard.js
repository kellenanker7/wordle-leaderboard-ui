import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setInProgress(true);
    setError(false);

    fetch("https://api.wordle.kellenanker.com/leaderboard")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => {
        setError(true);
        console.error(e);
      })
      .finally(() => setInProgress(false));
  }, [refresh]);

  return (
    <div>
      <h1>Wordle Leaderboard</h1>
      {error && <p>Oh no! Something went wrong!</p>}
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Avg. Guesses</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => {
            return (
              <tr key={i}>
                <td>
                  <Link to={`/user/${e.PhoneNumber}`}>{e.PhoneNumber}</Link>
                </td>
                <td>{e.Average}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button disabled={inProgress} onClick={() => setRefresh(!refresh)}>
        Refresh
      </button>
    </div>
  );
};

export default Leaderboard;
