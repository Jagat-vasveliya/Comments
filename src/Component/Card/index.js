import axios from "axios";
import React, { useEffect, useState } from "react";
import AddComment from "../AddComment";
import EditComment from "../EditComment";
import "./index.css";

export default function Card() {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState([]);
  const [replyData, setReplyData] = useState([]);
  const [commentData, setCommentData] = useState();
  const [replyId, setReplyid] = useState();
  const [title, setTitle] = useState();
  useEffect(() => {
    getData();
    getreplyData();
  }, []);

  const getData = async () => {
    const response = await axios.get(
      `https://61fe43c7a58a4e00173c97b0.mockapi.io/comments`
    );
    setData(response?.data);
  };

  const getreplyData = async (id) => {
    await axios
      .get(`https://61fe43c7a58a4e00173c97b0.mockapi.io/commentsReply`)
      .then((response) => setReplyData(response.data))
      .catch((err) => {
        console.log(err);
      });
  };

  const showAddModal = () => {
    setAddModal(true);
    setReplyid();
    setTitle("Add");
  };

  const addReply = (id) => {
    setAddModal(true);
    setReplyid(id);
    setTitle("Reply");
  };

  const editComment = (comment) => {
    setEditModal(true);
    setCommentData(comment);
    setTitle("Edit");
  };

  const deleteComment = (id, table) => {
    if (window.confirm("Are you sure you want to delete it ?")) {
      axios({
        method: "DELETE",
        url: `https://61fe43c7a58a4e00173c97b0.mockapi.io/${table}/${id}`,
      }).then((respone) => {
        getData();
        getreplyData();
      });
      // if (table === "comments")
      //   axios
      //     .delete(`https://61fe43c7a58a4e00173c97b0.mockapi.io/commentsReply`, {
      //       data: {
      //         commentId: id,
      //       },
      //     })
      //     .then((respone) => {
      //       getData();
      //       getreplyData();
      //     });
    }
  };

  const like = (status, id, table) => {
    const url = `https://61fe43c7a58a4e00173c97b0.mockapi.io/${table}/${id}`;
    axios({
      method: "put",
      url: url,
      data: {
        like: status,
      },
    }).then((respone) => {
      getData();
      getreplyData();
    });
  };
  const ReplyCard = (props) => {
    return (
      <>
        {replyData
          .filter((filterComment) => filterComment.commentId === props.id)
          .map((comment, key) => {
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
                        onClick={() =>
                          like(!comment.like, comment.id, "commentsReply")
                        }
                      >
                        Dislike
                      </span>
                    ) : (
                      <span
                        className="feature"
                        onClick={() =>
                          like(!comment.like, comment.id, "commentsReply")
                        }
                      >
                        Like
                      </span>
                    )}
                    <span
                      className="feature"
                      onClick={() => editComment(comment)}
                    >
                      Edit
                    </span>
                    <span
                      className="feature"
                      onClick={() => deleteComment(comment.id, "commentsReply")}
                    >
                      Delete
                    </span>
                    <span className="time">{comment.edit}&nbsp;&nbsp;&nbsp;{comment.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  };
  return (
    <>
      {addModal ? (
        <AddComment
          title={title}
          replyId={replyId}
          getData={getData}
          getreplyData={getreplyData}
          setModal={setAddModal}
        />
      ) : null}
      {editModal ? (
        <EditComment
          title={title}
          comment={commentData}
          getreplyData={getreplyData}
          getData={getData}
          setEditModal={setEditModal}
        />
      ) : null}
      <div className="add-btn">
        <button className="btn" onClick={() => showAddModal()}>
          Add
        </button>
      </div>
      {data.map((comment, key) => {
        return (
          <div key={key}>
            <div className="container">
              <div className="comment-title">{comment?.name}</div>
              <hr />
              <div className="comment-text">{comment?.message}</div>
              <hr />
              <div className="comment-footer">
                <div className="comment-feature">
                  {comment?.like ? (
                    <span
                      className="feature"
                      onClick={() =>
                        like(!comment?.like, comment?.id, "comments")
                      }
                    >
                      Dislike
                    </span>
                  ) : (
                    <span
                      className="feature"
                      onClick={() =>
                        like(!comment?.like, comment?.id, "comments")
                      }
                    >
                      Like
                    </span>
                  )}
                  <span
                    className="feature"
                    onClick={() => editComment(comment)}
                  >
                    Edit
                  </span>
                  <span
                    className="feature"
                    onClick={() => deleteComment(comment?.id, "comments")}
                  >
                    Delete
                  </span>
                  <span
                    className="feature"
                    onClick={() => addReply(comment.id)}
                  >
                    Reply
                  </span>
                  <span className="time">{comment.edit}&nbsp;&nbsp;&nbsp;{comment.time}</span>
                </div>
              </div>
            </div>
            <ReplyCard id={comment.id} />
          </div>
        );
      })}
    </>
  );
}
