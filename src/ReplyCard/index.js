import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ReplyCard(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    axios
      .get(
        `https://61fe43c7a58a4e00173c97b0.mockapi.io/commentsReply?commentId=${props.id}`
      )
      .then((response) => response.data)
      .then((responseData) => {
        setData(responseData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const like = (status, id) => {
    const url = `https://61fe43c7a58a4e00173c97b0.mockapi.io/commentsReply/${id}`;
    axios({
      method: "put",
      url: url,
      data: {
        like: status,
      },
    }).then((respone) => {
      getData();
    });
  };

  const deleteComment = (id) => {
    if (window.confirm("Are you sure you want to delete it ?" + id)) {
      axios({
        method: "DELETE",
        url: `https://61fe43c7a58a4e00173c97b0.mockapi.io/commentsReply/${id}`,
      }).then((respone) => {
        getData();
      });
    }
  };

  return (
    <>
      {data.map((comment ,key) => {
        return (
          <div className="reply-container" key={key}>
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
                <span className="time">{comment.time}</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
