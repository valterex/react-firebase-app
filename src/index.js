import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./components/App";
import EditPost from "./components/EditPost";
import AddPost from "./components/EditPost";
import Post from "./components/Post";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/edit/:id" component={EditPost} />
        <Route path="/add" component={AddPost} />
        <Route path="/post/:id" component={Post} />
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
