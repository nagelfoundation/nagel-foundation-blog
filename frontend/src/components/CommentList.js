import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { baseURL } from "./../services/comment.service";
import { useHistory } from "react-router-dom";

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const history = useHistory();
  const countRef = useRef(0);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    retrieveAllComments();
  }, [countRef]);
  const retrieveAllComments = () => {
    axios
      .get(`${baseURL}/comment/`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`${baseURL}/comment/${id}/`)
      .then((response) => {
        setDeleted(true);
        retrieveAllComments();
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const handleUpdateClick = (id) => {
    history.push(`/comments/${id}/update/`);
  };
  return (
    <div className="row justify-content-center">
      <div className="col">
        {deleted && (
          <div className="container mt-3 alert alert-warning" role="alert">
            <strong>Deleted!</strong>
          </div>
        )}
        {comments &&
          comments.map((comment, index) => (
            <div className="container mt-3 mb-3" key={comment.id}>
              <div className="card-body p-4 p-md-5 mb-4 rounded bg-light">
                <h2 className="card-title font-weight-bold">{comment.title}</h2>
                <h4 className="card-subtitle mb-2">user: {comment.user}</h4>
                <p className="card-text">{comment.content}</p>
                <p>
                  {comment.month} {comment.day}
                </p>
              </div>
              <div className="">
                <div className="btn-group" data-toggle="buttons">
                  <button
                    className="btn btn-outline-secondary btn-sm p-1"
                    onClick={() => handleUpdateClick(comment.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm p-1"
                    onClick={() => deleteComment(comment.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="container px-4">
        <p className="lead mb-5 px-4">
          <Link
            to="/add-comment"
            className="font-weight-bold text-decoration-none"
          >
            Add Comment
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CommentList;
