import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Header from "./Header.js";

const Today = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(true);

  useEffect(() => {
    setInProgress(true);
    setError(false);
    fetch("https://api.wordle.kellenanker.com/today")
      .then((res) => res.text())
      .then((data) => {
        return data.ok ? navigate(`/puzzle/${data}`) : setError(true);
      })
      .catch((e) => {
        setError(true);
        console.error(e);
      })
      .finally(() => setInProgress(false));
  }, [navigate]);

  return (
    <>
      <Header active="puzzles" />
      {error && <p>Oh no! Something went wrong!</p>}
      {inProgress && <Spinner animation="border" />}
    </>
  );
};

export default Today;
