import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Header from "./Header";

const User = () => {
  const { user } = useParams();
  const [data, setData] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState(false);
  const formattedNumber = `(${String(user).substring(0, 3)}) ${String(
    user
  ).substring(3, 6)}-${String(user).substring(6)}`;

  useEffect(() => {
    setError(false);
    setInProgress(true);

    fetch(`https://api.wordle.kellenanker.com/user/${user}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => {
        setError(true);
        console.error(e);
      })
      .finally(() => setInProgress(false));
  }, [user]);

  return (
    <div>
      <Header user={formattedNumber} />
      {error && <p>Oh no! Something went wrong!</p>}
      {(inProgress && <Spinner animation="border"></Spinner>) || (
        <Table striped bordered>
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
      )}
    </div>
  );
};

export default User;
