import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { wordleApi } from "./Constants";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Header from "./Header";
import CustomPagination from "./Pagination";

const Wordles = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);
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
          <CustomPagination
            page={page}
            pageSize={pageSize}
            dataLength={data.length}
            setPage={setPage}
          />
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
