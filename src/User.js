import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";

const User = () => {
  const { user } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);

    fetch(`https://api.wordle.kellenanker.com/user/${user}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => {
        setError(true);
        console.error(e);
      });
  }, [user]);

  return (
    <div>
      <h2>{`(${String(user).substring(0, 3)}) ${String(user).substring(
        3,
        6
      )}-${String(user).substring(6)}`}</h2>
      {error && <p>Oh no! Something went wrong!</p>}
      <Table>
        <thead>
          <tr>
            <th>Puzzle</th>
            <th>Guesses</th>
            <th>Victory?</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => {
            return (
              <tr key={i}>
                <td>{e.PuzzleNumber}</td>
                <td>{e.Guesses}</td>
                <td>{e.Victory ? "✅" : "❌"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default User;
