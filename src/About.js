import { Link } from "react-router-dom";
import { colors } from "./Constants";
import Header from "./Header";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const About = () => {
  return (
    <>
      <Header active="About" />
      <Container>
        <Row>
          <Col>
            <h2>Leaderboard</h2>
            <p>
              The <Link to="/leaderboard">leaderboard</Link> ranks users by
              their average number of guesses taken to solve Wordles. Users must
              solve at least three Wordles over the given time period to earn a
              place on the leaderboard.
            </p>
            <p>
              Users achieve a "hot streak" (🔥) after successfuly completing
              three consecutive Wordles. Skipping a Wordle snaps a streak, as
              does failing to solve a Wordle.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Color scheme</h2>
            <p>
              The following color scheme is used throughout this app to denote
              users' proficiency at solving Wordles:
            </p>
            <Table>
              <tbody>
                {colors.map((e, i) => (
                  <tr key={i} style={{ background: e, textAlign: "center" }}>
                    <td>
                      {i === 0 && "Solved in 1 guess"}
                      {i >= 1 && i <= 5 && `Solved in ${i + 1} guesses`}
                      {i > 5 && "Failed to solve"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Acknowledgements</h2>
            <ul>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://dictionaryapi.dev/"
                >
                  Free Dictionary API
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://wordfinder.yourdictionary.com/wordle/answers/"
                >
                  WordFinder
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://worldtimeapi.org"
                >
                  WorldTimeAPI
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
