import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { wordleApi } from "./Constants";
import Spinner from "react-bootstrap/Spinner";
import Header from "./Header";

const Today = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    setInProgress(true);
    setError(false);

    fetch(`${wordleApi}/today`)
      .then((res) => res.json())
      .then((data) => navigate(`/wordle/${data.PuzzleNumber}`))
      .catch((e) => {
        console.error(e);
        setError(true);
      })
      .finally(() => setInProgress(false));
  }, [navigate]);

  return (
    <>
      <Header active="wordles" />
      {error ? (
        <p>Oh no! Something went wrong!</p>
      ) : (
        inProgress && <Spinner animation="border" />
      )}
    </>
  );
};

export default Today;
