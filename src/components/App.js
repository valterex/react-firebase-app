import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utils";
import AddPost from "./AddPost";
import Posts from "./Posts";
import Loading from "./Loading";
import Navigation from "./Navigation";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      title: "",
      content: "",
      isLoading: false
    };
  }

  componentDidMount = () => {
    this.setState({ isLoading: true });

    this.unsubscribeFromFirestore = firestore
      .collection("posts")
      .onSnapshot(snapshot => {
        const posts = snapshot.docs.map(collectIdsAndDocs);
        this.setState({ posts: posts, isLoading: false });
      });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };

  render() {
    const { isLoading, posts, title, content } = this.state;

    return (
      <Fragment>
        <Navigation />
        <Container>
          <Row>
            <Col md={6} lg={6} sm={12}>
              <AddPost title={title} content={content} />
            </Col>
            {isLoading ? (
              <Col>
                <Loading />
              </Col>
            ) : (
              <Col md={6} lg={6} sm={12}>
                <Posts posts={posts} />
              </Col>
            )}
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default App;
