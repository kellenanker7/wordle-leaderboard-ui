import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { wordleApi } from "./Constants.js";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Header from "./Header";

const Wordles = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    setError(false);
    setInProgress(true);

    fetch(`${wordleApi}/wordles`)
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
      <Header active="wordles" />
      {error ? (
        <p>Oh no! Something went wrong!</p>
      ) : inProgress ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Wordle</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {data.map((wordle, i) => {
              return (
                <tr key={i}>
                  <td>
                    <Link
                      style={{ display: "block" }}
                      to={`/wordle/${wordle.Id}`}
                    >
                      {wordle.Id}
                    </Link>
                  </td>
                  <td>{wordle.Answer ? wordle.Answer : "🤫"}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Wordles;
