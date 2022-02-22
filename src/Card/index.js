import axios from "axios";
import React, { useEffect, useState } from "react";
import ReplyCard from "../ReplyCard";
import "./index.css";

export default function Card() {
  const [data, setData] = useState([]);
	const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(
      `https://61fe43c7a58a4e00173c97b0.mockapi.io/comments`
    );
    setData(response.data);
  };

  const like = (status, id) => {
    const url = `https://61fe43c7a58a4e00173c97b0.mockapi.io/comments/${id}`;
    axios({
      method: "put",
      url: url,
      data: {
        like: status,
      },
    }).then((respone) => {
      setRefresh(!refresh);
    });
  };

  const deleteComment = (id) => {
    if (window.confirm("Are you sure you want to delete it ?" + id)) {
      axios({
        method: "DELETE",
        url: `https://61fe43c7a58a4e00173c97b0.mockapi.io/comments/${id}`,
      }).then((respone) => {
        getData();
      });
    }
  };

  return (
    <>
      {data.map((comment) => {
        return (
          <>
            <div className="container">
              <div className="comment-title">{comment.name}</div>
              <hr />
              <div className="comment-text">{comment.message}</div>
              <hr />
              <div className="comment-footer">
                <div className="comment-feature">
                  {comment.like ? (
                    <span
                      className="feature"
                      onClick={() => like(!comment.like, comment.id)}
                    >
                      Dislike
                    </span>
                  ) : (
                    <span
                      className="feature"
                      onClick={() => like(!comment.like, comment.id)}
                    >
                      Like
                    </span>
                  )}
                  <span className="feature">Edit</span>
                  <span
                    className="feature"
                    onClick={() => deleteComment(comment.id)}
                  >
                    Delete
                  </span>
                  <span className="feature">Reply</span>
                  <span className="time">{comment.time}</span>
                </div>
              </div>
            </div>
            <ReplyCard id={comment.id} />
          </>
        );
      })}
    </>
  );
}