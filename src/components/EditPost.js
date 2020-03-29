import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import firebase from "../firebase";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navigation from "./Navigation";

const PostHeader = styled.div`
  background-color: #1590bf;
  margin-top: 1rem;
  padding: 1rem;
  color: white;
`;

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      title: "",
      content: ""
    };
  }

  componentDidMount = () => {
    const postRef = firebase
      .firestore()
      .collection("posts")
      .doc(this.props.match.params.id);

    postRef.get().then(doc => {
      if (doc.exists) {
        const post = doc.data();

        this.setState({
          key: doc.id,
          title: post.title,
          content: post.content
        });
      } else {
        console.log("No such document!");
      }
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, content, key } = this.state;

    const updateRef = firebase
      .firestore()
      .collection("posts")
      .doc(key);

    updateRef
      .update({
        title,
        content
      })
      .then(docRef => {
        this.setState({
          title: "",
          content: ""
        });
        this.props.history.push("/post/" + this.props.match.params.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    const { title, content } = this.state;

    return (
      <Fragment>
        <Navigation />
        <Container>
          <Row>
            <Col>
              <PostHeader>Edit post</PostHeader>
              <Form
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "1rem"
                }}
              >
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter a title"
                    value={title}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    type="text"
                    name="content"
                    placeholder="What's up?"
                    value={content}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button
                  style={{
                    backgroundColor: "#1590bf",
                    border: "0",
                    marginRight: "5px"
                  }}
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
                <Link to={"/"}>
                  <Button
                    type="submit"
                    variant="secondary"
                    style={{ border: "0" }}
                  >
                    Cancel
                  </Button>
                </Link>
              </Form>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default EditPost;
