import { useState, useEffect } from "react";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setError(false);
    fetch("https://api.wordle.kellenanker.com/leaderboard")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => {
        setError(true);
        console.error(e);
      })
      .finally(() => setRefresh(false));
  }, [refresh]);

  console.log(data);

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
                <td>{e.PhoneNumber}</td>
                <td>{e.Average}</td>
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
