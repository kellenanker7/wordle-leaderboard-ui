import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { wordleApi } from "./Constants.js";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Header from "./Header";

const limitOpts = Array.from({ length: 3 }, (_, i) => (i + 1) * 10);

const Puzzles = () => {
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
      <Header active="puzzles" />
      {error ? (
        <p>Oh no! Something went wrong!</p>
      ) : inProgress ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Row>
            <Form
              onSubmit={() => {
                navigate(`/puzzle/${search}`);
              }}
              className="d-flex"
            >
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Jump to a puzzle..."
              />
            </Form>
          </Row>
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
        </>
      )}
    </>
  );
};

export default Puzzles;
