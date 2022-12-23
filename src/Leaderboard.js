import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Header from "./Header";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setInProgress(true);

    fetch("https://api.wordle.kellenanker.com/leaderboard")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => {
        setError(true);
        console.error(e);
      })
      .finally(() => setInProgress(false));
  }, []);

  return (
    <div>
      <Header />
      {error && <p>Oh no! Something went wrong!</p>}
      {(inProgress && <Spinner animation="border"></Spinner>) || (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Number</th>
              <th>Avg. Guesses</th>
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
                  </td>
                  <td>{e.Average}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Leaderboard;
