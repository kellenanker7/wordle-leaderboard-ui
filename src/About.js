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
            average number of guesses taken to solve Wordles. Users must solve
            at least three Wordles over the given time period to earn a place on
            the leaderboard.
          </p>
          <p>
            Users achieve a "hot streak" (🔥) after successfuly completing three
            consecutive Wordles. Skipping a Wordle snaps a streak, as does
            failing to solve a Wordle.
          </p>
        </Row>
        <Row>
          <h2>Acknowledgements</h2>
          <p>
            Wordle definitions powered by{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://dictionaryapi.dev/"
            >
              Free Dictionary API
            </a>
            . Wordle archive powered by{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://wordfinder.yourdictionary.com/wordle/answers/"
            >
              WordFinder
            </a>
            . Timezone data powered by{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://worldtimeapi.org"
            >
              WorldTimeAPI
            </a>
            .
          </p>
        </Row>
        <Row>
          <h2>Color scheme</h2>
          <p>
            The following color scheme is used throughout this app to denote
            users' proficiency at solving Wordles:
          </p>
          <div>
            {colors.map((e, i) => (
              <div key={i} style={{ background: e, textAlign: "center" }}>
                {i <= 1 && "Solved in 1 guess"}
                {i > 1 && i < 7 && `Solved in ${i} guesses`}
                {i >= 7 && "Failed to solve"}
              </div>
            ))}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default About;
