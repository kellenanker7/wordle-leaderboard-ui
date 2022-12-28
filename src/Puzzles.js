import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { wordleApi } from "./Constants.js";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
import Header from "./Header";

const limitOpts = Array.from({ length: 3 }, (_, i) => (i + 1) * 10);

const Puzzles = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [limit, setLimit] = useState(10);

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
        <>
          <Dropdown>
            <Dropdown.Toggle size="md" variant="Primary">
              {`Last ${limit}`}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {limitOpts.map((e, i) => {
                return (
                  <Dropdown.Item key={i} onClick={() => setLimit(e)}>
                    {e}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Table striped bordered>
            <tbody>
              {Array.from(
                { length: limit },
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
        </>
      )}
    </>
  );
};

export default Puzzles;
