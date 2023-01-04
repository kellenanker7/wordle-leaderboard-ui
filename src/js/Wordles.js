import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { wordleApi } from "./Constants";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./Header";
import CustomPagination from "./Pagination";

const limitOpts = [10, 25, 50];

const Wordles = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
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
        <>
          <Row>
            <Col>
              <Dropdown>
                <Dropdown.Toggle size="md" variant="Primary">
                  {`Show ${pageSize}`}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {limitOpts.map((e, i) => {
                    return (
                      <Dropdown.Item
                        key={i}
                        onClick={() => {
                          setPage(0);
                          setPageSize(e);
                        }}
                      >
                        {e}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col className="offset-4">
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
              {data
                .slice(page * pageSize, (page + 1) * pageSize)
                .map((e, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <Link
                          style={{ display: "block" }}
                          to={`/wordle/${e.Id}`}
                        >
                          {e.Id}
                        </Link>
                      </td>
                      <td>{e.Answer ? e.Answer : "🤫"}</td>
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
