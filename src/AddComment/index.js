import React from "react";
import "./index.css";

export default function AddComment() {
  return (
    <div className="modal">
      <div className="modal-container">
        <div className="modal-header">
          <span className="close">&times;</span>
          <div className="modal-title">Add Comment</div>
        </div>
        <hr />
        <div className="modal-body">
          <form>
            <div className="form-control">
              <label htmlFor="comment">Comment</label>
              <textarea name="" id=""></textarea>
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
