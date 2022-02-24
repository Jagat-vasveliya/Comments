import axios from "axios";
import React, { useState } from "react";
import "./index.css";

export default function AddComment(props) {
  const [message, setMessage] = useState("");
  const hendalChange = (event) => {
      setMessage(event.target.value);
  }
  const addComment = (e) => {
    e.preventDefault();
    props?.setModal(false)
    var today = new Date(),
      time =
        today.getHours() + ":" + today.getMinutes();
    const url = `https://61fe43c7a58a4e00173c97b0.mockapi.io/comments`;
    axios({
      method: "post",
      url: url,
      data: {
        name: "Jagat Vasveliya",
        message: message,
        time: time,
        like: false,
        edit: "",
      },
    }).then((respone) => {
        props.getData();
    });
  };
  const replyComment = (e) => {
    e.preventDefault();
    props?.setModal(false)
    var today = new Date(),
      time =
        today.getHours() + ":" + today.getMinutes();
    const url = `https://61fe43c7a58a4e00173c97b0.mockapi.io/commentsReply`;
    axios({
      method: "post",
      url: url,
      data: {
        commentId: props.replyId,
        name: "Jagat Vasveliya",
        message: message,
        time: time,
        like: false,
        edit: "",
      },
    }).then((respone) => {
        props.getreplyData();
    }).catch((err)=> console.log(err));
  };
  return (
    <div className="modal">
      <div className="modal-container">
        <div className="modal-header">
          <span className="close" onClick={() => props?.setModal(false)}>
            &times;
          </span>
          <div className="modal-title">{props.title} Comment</div>
        </div>
        <hr />
        <div className="modal-body">
          <form onSubmit={props.replyId ? (e) => replyComment(e) : (e) => addComment(e)}>
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
              <button className="button">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
