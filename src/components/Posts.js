import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

const Posts = ({ posts }) => {
  return (
    <Fragment>
      <Table style={{ marginTop: "1rem", padding: "1rem" }} hover>
        <thead style={{ backgroundColor: "#1590bf", border: "0" }}>
          <tr>
            <th
              style={{
                fontWeight: "400",
                color: "white",
                border: "0",
                padding: "1rem"
              }}
            >
              Posts
            </th>
            <th style={{ border: "0" }}></th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <td>
                <Link to={`/post/${post.id}`} style={{ color: "#1590bf" }}>
                  {post.title}
                </Link>
              </td>
              <td>{post.content}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default Posts;
