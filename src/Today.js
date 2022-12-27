import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Today = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.wordle.kellenanker.com/today")
      .then((res) => res.text())
      .then((data) => navigate(`/puzzle/${data}`));
  }, [navigate]);

  return <Spinner animation="border"></Spinner>;
};

export default Today;
