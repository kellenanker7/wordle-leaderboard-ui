import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Header from "./Header";

const Puzzles = () => {
  const [data, setData] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setInProgress(true);

    fetch("https://api.wordle.kellenanker.com/today")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => {
        setError(true);
        console.error(e);
      })
      .finally(() => setInProgress(false));
  }, []);

  return (
    <>
      <Header />
      {error && <p>Oh no! Something went wrong!</p>}
      {(inProgress && <Spinner animation="border"></Spinner>) || (
        <Table striped bordered>
          <tbody>
            {Array.from({ length: 10 }, (_, i) => -1 * (i - data)).map(
              (puzzle, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <Link to={`/puzzle/${puzzle}`}>{puzzle}</Link>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Puzzles;
