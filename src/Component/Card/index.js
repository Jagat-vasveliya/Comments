import React, { useEffect, useState } from "react";
import api from "../../API/api";
import AddComment from "../AddComment";
import EditComment from "../EditComment";
import "./index.css";

export default function Card() {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState([]);
  const [commentData, setCommentData] = useState();
  const [replyId, setReplyid] = useState();
  const [title, setTitle] = useState();
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    api.get().then((response) => setData(response?.data));
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
      api.delete(`/${id}`).then((respone) => {
        getData();
        // getreplyData();
      });
      if (table === "comments")
        api.delete(`/${id}/commentsReply/`).then((respone) => {
          getData();
          // getreplyData();
        });
    }
  };

  const like = (status, id, table) => {
    api
      .put(`/${id}`, {
        data: {
          like: status,
        },
      })
      .then((respone) => {
        getData();
        // getreplyData();
      });
  };
  const ReplyCard = (props) => {
    const [replyData, setReplyData] = useState([]);
    useEffect(() => {
      getreplyData(props.id);
    }, [props.id]);

    const getreplyData = (id) => {
      api
        .get(`/${id}/commentsReply/`)
        .then((response) => setReplyData(response?.data));
    };

    return (
      <>
        {replyData.map((comment, key) => {
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
                  <span className="time">
                    {comment.edit}&nbsp;&nbsp;&nbsp;{comment.time}
                  </span>
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
          // getreplyData={getreplyData}
          setModal={setAddModal}
        />
      ) : null}
      {editModal ? (
        <EditComment
          title={title}
          comment={commentData}
          // getreplyData={getreplyData}
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
                  <span className="time">
                    {comment.edit}&nbsp;&nbsp;&nbsp;{comment.time}
                  </span>
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
