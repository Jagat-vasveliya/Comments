import axios from "axios";
import React, { useState } from "react";

export default function EditComment(props) {
  const [message, setMessage] = useState(props.comment.message);

  const hendalChange = (event) => {
    setMessage(event.target.value);
  };
  const editComment = (e) => {
    e.preventDefault();
    props?.setEditModal(false);
    var today = new Date(),
      time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const url = `https://61fe43c7a58a4e00173c97b0.mockapi.io/comments/${props.comment.id}`;
    axios({
      method: "put",
      url: url,
      data: {
        name: "Jagat Vasveliya",
        message: message,
        time: time,
        like: props.comment.like,
      },
    }).then((respone) => {
      props.getData();
    });
  };
  const editReplyComment = (e) => {
    e.preventDefault();
    props?.setEditModal(false);
    var today = new Date(),
      time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const url = `https://61fe43c7a58a4e00173c97b0.mockapi.io/commentsReply/${props.comment.id}`;
    axios({
      method: "put",
      url: url,
      data: {
        commentId: props.comment.commentId,
        name: "Jagat Vasveliya",
        message: message,
        time: time,
        like: false,
      },
    }).then((respone) => {
      props.getreplyData();
    });
  };
  return (
    <div className="modal">
      <div className="modal-container">
        <div className="modal-header">
          <span className="close" onClick={() => props?.setEditModal(false)}>
            &times;
          </span>
          <div className="modal-title">{props.title} Comment</div>
        </div>
        <hr />
        <div className="modal-body">
          <form
            onSubmit={
              props.comment.commentId ? (e) => editReplyComment(e) : (e) => editComment(e)
            }
          >
            <div className="form-control">
              <label htmlFor="message">Comment</label>
              <textarea
                name="message"
                id="message"
                value={message}
                onChange={(event) => hendalChange(event)}
                required
              ></textarea>
            </div>
            <div className="btn-send">
              <button className="button">Edit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
