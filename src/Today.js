import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Header from "./Header.js";

const Today = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.wordle.kellenanker.com/today")
      .then((res) => res.text())
      .then((data) => navigate(`/puzzle/${data}`));
  }, [navigate]);

  return (
    <>
      <Header />
      <Spinner animation="border"></Spinner>
    </>
  );
};

export default Today;
