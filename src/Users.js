import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Header from "./Header";

const Users = () => {
  const [data, setData] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setInProgress(true);

    fetch("https://api.wordle.kellenanker.com/users")
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
            {data.map((user, i) => {
              const formattedNumber = `(${String(user).substring(
                0,
                3
              )}) ${String(user).substring(3, 6)}-${String(user).substring(6)}`;
              return (
                <tr key={i}>
                  <td>
                    <Link to={`/user/${user}`}>{formattedNumber}</Link>
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
