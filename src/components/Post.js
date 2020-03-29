import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import firebase from "../firebase";
import Navigation from "./Navigation";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      key: ""
    };
  }

  componentDidMount() {
    const docRef = firebase
      .firestore()
      .collection("posts")
      .doc(this.props.match.params.id);

    docRef.get().then(doc => {
      if (doc.exists) {
        this.setState({
          post: doc.data(),
          key: doc.id
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  deletePost(id) {
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.props.history.push("/");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  }

  render() {
    const { post, key } = this.state;

    return (
      <Fragment>
        <Navigation />
        <Container>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <div
                style={{
                  backgroundColor: "#1590bf",
                  marginTop: "1rem",
                  padding: "1rem",
                  color: "white",
                  fontSize: "20px"
                }}
              >
                {post.title}
              </div>
              <Card>
                <Card.Body>
                  <Card.Text style={{ fontSize: "18px" }}>
                    {post.content}
                  </Card.Text>
                  <Link to={`/edit/${key}`}>
                    <Button
                      style={{
                        backgroundColor: "#1590bf",
                        fontSize: "12px",
                        border: "0"
                      }}
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    style={{ marginLeft: "10px", fontSize: "12px" }}
                    variant="danger"
                    onClick={this.deletePost.bind(this, key)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Post;
