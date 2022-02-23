import axios from "axios";
import React, { useEffect, useState } from "react";
import AddComment from "../AddComment";
import EditComment from "../EditComment";
import ReplyCard from "../ReplyCard";
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

  const getData = async () => {
    const response = await axios.get(
      `https://61fe43c7a58a4e00173c97b0.mockapi.io/comments`
    );
    setData(response?.data);
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
      getData();
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

  const editComment = (comment) =>{
    setEditModal(true);
    setCommentData(comment);
    setReplyid();
    setTitle("Edit");
  }
  return (
    <>
      {addModal ? (
        <AddComment
          title={title}
          replyId={replyId}
          getData={getData}
          setModal={setAddModal}
        />
      ) : null}
      {editModal ? (
        <EditComment
          title={title}
          comment={commentData}
          replyId={replyId}
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
                      onClick={() => like(!comment?.like, comment?.id)}
                    >
                      Dislike
                    </span>
                  ) : (
                    <span
                      className="feature"
                      onClick={() => like(!comment?.like, comment?.id)}
                    >
                      Like
                    </span>
                  )}
                  <span className="feature" onClick={()=>editComment(comment)}>Edit</span>
                  <span
                    className="feature"
                    onClick={() => deleteComment(comment?.id)}
                  >
                    Delete
                  </span>
                  <span
                    className="feature"
                    onClick={() => addReply(comment.id)}
                  >
                    Reply
                  </span>
                  <span className="time">{comment?.time}</span>
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
