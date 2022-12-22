import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);

    fetch("https://api.wordle.kellenanker.com/leaderboard")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => {
        setError(true);
        console.error(e);
      });
  }, []);

  return (
    <div>
      {error && <p>Oh no! Something went wrong!</p>}
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Number</th>
            <th>Avg. Guesses</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <Link to={`/user/${e.PhoneNumber}`}>{`(${String(
                    e.PhoneNumber
                  ).substring(0, 3)}) ${String(e.PhoneNumber).substring(
                    3,
                    6
                  )}-${String(e.PhoneNumber).substring(6)}`}</Link>
                </td>
                <td>{e.Average}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
