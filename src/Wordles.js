import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { wordleApi } from "./Constants.js";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Header from "./Header";

const Wordles = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState();
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
      <Header active="wordles" />
      {error ? (
        <p>Oh no! Something went wrong!</p>
      ) : inProgress ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Row>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/wordle/${search}`);
              }}
              className="d-flex"
            >
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Jump to a Wordle..."
              />
            </Form>
          </Row>
          <Table striped bordered>
            <tbody>
              {Array.from(
                { length: 10 },
                (_, i) => -1 * (i - data.PuzzleNumber)
              ).map((wordle, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <Link
                        style={{ display: "block" }}
                        to={`/wordle/${wordle}`}
                      >
                        {wordle}
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

export default Wordles;
