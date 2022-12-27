import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatNumber, wordleApi } from "./Constants.js";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Header from "./Header";

const Users = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    setError(false);
    setInProgress(true);

    fetch(`${wordleApi}/users`)
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
      <Header active="users" />
      {error ? (
        <p>Oh no! Something went wrong!</p>
      ) : inProgress ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered>
          <tbody>
            {data.map((user, i) => {
              return (
                <tr key={i}>
                  <td>
                    <Link to={`/user/${user}`}>{formatNumber(user)}</Link>
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

export default Users;
