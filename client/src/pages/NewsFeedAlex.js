import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import moment from "moment";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  CardGroup,
} from "reactstrap";
import UserContext from "../utils/UserContext";
import MotiveQuote from "../components/MotiveQuote";
import "./Auth/style.css";
import Search from "../components/Search";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
function Newsfeed(props) {
  const { loggedIn } = useContext(UserContext);
  const [AllPost, setAllPost] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    loadPost();
  }, []);
  function loadPost() {
    API.newsfeed()
      .then((res) => {
        console.log(res.data);
        setAllPost(res.data);
      })
      .catch((err) => console.log(err));
  }
  function deletePost(id) {
    API.deletePost(id)
      .then((res) => loadPost())
      .catch((err) => console.log(err));
  }
  const submitSearch = () => {
    API.getSearch(search)
      .then((res) => {
        setAllPost(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <Row>
        {!loggedIn ? (
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <h2>Welcome to Study Buddy!</h2>
            <p style={{ fontSize: "1.25em" }}>
              Study Buddy is designed to help you connect with fellow students
              or like minded folks who would like to study the same subject
              together. Login, Choose a Subject, Choose to Connect Virtually or
              in Person and Choose how many people you'd like to study with. You
              can see who's studying the same subject and connect with them.
            </p>
          </Col>
        ) : (
          ""
        )}
      </Row>
      {loggedIn ? (
        <Row>
          <Col xs="auto">
            <MotiveQuote />
            <Search
              setSearch={setSearch}
              submitSearch={submitSearch}
              search={search}
              subjects={subjects}
              handleInputChange={handleInputChange}
            />
          </Col>
          <Row xs="3">
            {AllPost.map((post) => (
              <div>
                <Card key={post._id}>
                  <Row className="delete_button">
                    <Col>
                      <Button
                        className="float-right"
                        close
                        onClick={() => deletePost(post._id)}
                      />
                    </Col>
                  </Row>
                  <CardImg className="Image" />
                  <img
                    className="card__image"
                    src={post.userId.Image}
                    width="215px"
                    justify-content="center"
                    align-items="center"
                  ></img>
                  <CardBody className="grid-child-posts">
                    <CardTitle>
                      <CardText className="card__name">
                        <p>{post.userId.username}</p>
                      </CardText>
                    </CardTitle>
                    <CardTitle>
                      <Row xs="1">
                        <Col>
                          <div className="value">Buddies</div>
                          <div className="type">{post.group}</div>
                        </Col>
                        <Col>
                          <div className="value">Subject</div>
                          <div className="type">{post.subject}</div>
                        </Col>
                      </Row>
                    </CardTitle>
                    <Row>
                      <Col>
                        <ul class="social-icons">
                          <li>
                            <a href="#">
                              <i className="fa fa-instagram">
                                <FaInstagram />
                              </i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-twitter">
                                <FaTwitter />
                              </i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-linkedin">
                                <FaLinkedinIn />
                              </i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-github">
                                <FaGithub />
                              </i>
                            </a>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button className="Connect-Button">
                          <Link to={"/post/" + post._id}>
                            <strong>Lets Link Up!</strong>
                          </Link>
                        </Button>
                      </Col>
                    </Row>
                    <CardFooter className="footer-background">
                      <Col className="Date">
                        {moment(post.date).format("MMMM Do YYYY")}
                      </Col>
                      <Col className="Location">{post.location}</Col>
                    </CardFooter>
                  </CardBody>
                </Card>
              </div>
            ))}
          </Row>
        </Row>
      ) : (
        <Row>
          <Col>
            <div id="loginSection">
              <h4> Log in to view this page </h4>
              <Link to="/login">
                <Button> Login </Button>
              </Link>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}
export default Newsfeed;
