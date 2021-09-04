import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { deleteRepo } from "../store/dispatch/dispatch";
import { useHistory } from "react-router";

function DraftArticle({ article, deleteRepo }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const history = useHistory();
  const deleteModalClose = () => {
    setDeleteModal(false);
  };

  useEffect(() => {
    if (isDelete) {
      deleteRepo(article._id);
      setIsDelete(false);
      setDeleteModal(false);
    }
  }, [article._id, isDelete, deleteRepo]);

  return (
    <li>
      <strong onClick={() => history.push(`/write-article/${article._id}`)}>
        {article.title ? (
          article.title
        ) : (
          <i style={{ fontWeight: 100 }}>No Title</i>
        )}
      </strong>
      <div className="group__right">
        <strong>
          <i>{article.date}</i>
        </strong>
        <div className="buttons-group">
          <button
            onClick={() => history.push(`/article-review/${article._id}`)}
            className="buttons-group-review"
          >
            Review
          </button>
          <button
            onClick={() => setDeleteModal(true)}
            className="buttons-group-delete"
          >
            Delete
          </button>
        </div>
      </div>
      <Modal show={deleteModal} onHide={deleteModalClose}>
        <Modal.Header>
          <div>
            You are attempting to delete{" "}
            <b>
              <i>{article.title ? article.title : article.date}.</i>
            </b>{" "}
            Are you sure?
          </div>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => setIsDelete(true)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </li>
  );
}

const mapDispatchToProps = (dispatch) => ({
  deleteRepo: (repoId) => deleteRepo(dispatch, repoId),
});

export default connect(null, mapDispatchToProps)(DraftArticle);
