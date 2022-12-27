import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { wordleApi } from "./Constants.js";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Header from "./Header";

const Puzzles = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    setError(false);
    setInProgress(true);

    fetch(`${wordleApi}/today`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => {
        console.error(e);
        setError(true);
      })
      .finally(() => setInProgress(false));
  }, []);

  return (
    <>
      <Header active="puzzles" />
      {error ? (
        <p>Oh no! Something went wrong!</p>
      ) : inProgress ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered>
          <tbody>
            {Array.from(
              { length: 10 },
              (_, i) => -1 * (i - data.PuzzleNumber)
            ).map((puzzle, i) => {
              return (
                <tr key={i}>
                  <td>
                    <Link to={`/puzzle/${puzzle}`}>{puzzle}</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Puzzles;
