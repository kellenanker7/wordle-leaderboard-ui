import { useState, useEffect } from "react";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setError(false);
    fetch("https://wordle.kellenanker.com/topten")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => {
        setError(true);
        console.error(e);
      })
      .finally(() => setRefresh(false));
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
                <td>{e.number}</td>
                <td>{e.avg}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => setRefresh(true)}>Refresh</button>
    </div>
  );
};

export default Leaderboard;
