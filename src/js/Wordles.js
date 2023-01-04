import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { wordleApi } from "./Constants";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./Header";
import CustomPagination from "./Pagination";

const WordleRow = ({ id, answer }) => (
  <tr>
    <td>
      <Link style={{ display: "block" }} to={`/wordle/${id}`}>
        {id}
      </Link>
    </td>
    <td>{answer ? answer : "🤫"}</td>
  </tr>
);

const Wordles = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [search, setSearch] = useState();
  const pageSize = 10;

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
        <>
          <Row style={{ maxWidth: "100%" }}>
            <Col className="col-8" style={{ paddingRight: 0 }}>
              <Form className="d-flex">
                <Form.Control
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  placeholder="Search for a Wordle..."
                />
              </Form>
            </Col>
            <Col className="col-4" style={{ paddingLeft: 0 }}>
              <CustomPagination
                page={page}
                pageSize={pageSize}
                dataLength={data.length}
                setPage={setPage}
              />
            </Col>
          </Row>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Wordle</th>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>
              {search
                ? data
                    .filter(
                      (w) =>
                        w.Id.toString().startsWith(search) ||
                        w.Answer.toString()
                          .toLowerCase()
                          .startsWith(search.toLowerCase())
                    )
                    .map((e, i) => (
                      <WordleRow key={i} id={e.Id} answer={e.Answer} />
                    ))
                : data
                    .slice(page * pageSize, (page + 1) * pageSize)
                    .map((e, i) => (
                      <WordleRow key={i} id={e.Id} answer={e.Answer} />
                    ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default Wordles;
