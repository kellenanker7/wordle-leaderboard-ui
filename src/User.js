import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const { user } = useParams();
  const [data, setData] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setInProgress(true);
    setError(false);

    fetch(`https://api.wordle.kellenanker.com/user/${user}`)
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
      <h1>{user}</h1>
      {error && <p>Oh no! Something went wrong!</p>}
      <table>
        <thead>
          <tr>
            <th>Puzzle</th>
            <th>Guesses</th>
            <th>Victory?</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => {
            console.log(e);
            return (
              <tr key={i}>
                <td>{e.PuzzleNumber}</td>
                <td>{e.Guesses}</td>
                <td>{e.Victory ? "yes" : "no"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => setRefresh(!refresh)}>Refresh</button>
    </div>
  );
};

export default User;
