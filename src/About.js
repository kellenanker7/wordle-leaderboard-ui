import { Link } from "react-router-dom";
import { colors } from "./Constants.js";
import Header from "./Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const About = () => {
  return (
    <>
      <Header active="About" />
      <Container>
        <Row>
          <h2>Leaderboard</h2>
          <p>
            The <Link to="/leaderboard">leaderboard</Link> ranks users by their
            average number of guesses taken to solve Wordles.
          </p>
          <p>
            Users must solve at least three Wordles over the given time period
            to earn a place on the leaderboard
          </p>
          <p>
            Users achieve a "hot streak" (denoted by 🔥) after successfuly
            completing three consecutive Wordles.
          </p>
          <p>
            Skipping a puzzle snaps a streak, as does failing to solve the
            puzzle altogether.
          </p>
        </Row>
        <Row>
          <h2>Color scheme</h2>
          <p>
            The following color scheme is used throughout this app to denote
            users' proficiency at solving Wordles:
          </p>
          <div>
            {Object.keys(colors).map((e) => (
              <div
                key={e}
                style={{ background: colors[e], textAlign: "center" }}
              >
                {e <= 1 && "Solved in 1 guess"}
                {e > 1 && e < 7 && `Solved in ${e} guesses`}
                {e >= 7 && "Failed to solve"}
              </div>
            ))}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default About;
