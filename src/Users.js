import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatNumber, formatName, wordleApi } from "./Constants";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Header from "./Header";

const Users = () => {
  const [search, setSearch] = useState();
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
        <>
          <Form className="d-flex">
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search for a user..."
            />
          </Form>
          <Table striped bordered>
            <tbody>
              {search
                ? data
                    .filter((u) =>
                      u.CallerName.toString()
                        .toLowerCase()
                        .startsWith(search.toLowerCase())
                    )
                    .map((user, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <Link
                              style={{ display: "block" }}
                              to={`/user/${user.PhoneNumber}`}
                            >
                              {formatName(user.CallerName) ||
                                formatNumber(data.PhoneNumber)}
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                : data.map((user, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <Link
                            style={{ display: "block" }}
                            to={`/user/${user.PhoneNumber}`}
                          >
                            {formatName(user.CallerName) ||
                              formatNumber(data.PhoneNumber)}
                          </Link>
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

export default Users;
