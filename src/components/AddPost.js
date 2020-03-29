import React, { Component, Fragment } from "react";
import styled from "@emotion/styled";
import { firestore } from "../firebase";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const PostHeader = styled.div`
  background-color: #1590bf;
  margin-top: 1rem;
  padding: 1rem;
  color: white;
`;

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, content } = this.state;

    const post = {
      title,
      content,
      favorites: 0,
      comments: 0,
      createdAt: new Date()
    };

    if (title === "" || content === "") {
      return;
    } else {
      firestore
        .collection("posts")
        .doc()
        .set(post);

      this.setState({ title: "", content: "" });
    }
  };

  render() {
    const { title, content } = this.state;

    return (
      <Fragment>
        <PostHeader>Add post</PostHeader>
        <Form
          style={{
            backgroundColor: "#f5f5f5",
            marginTop: "0",
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
            style={{ backgroundColor: "#1590bf", border: "0" }}
            type="submit"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </Fragment>
    );
  }
}

export default AddPost;
