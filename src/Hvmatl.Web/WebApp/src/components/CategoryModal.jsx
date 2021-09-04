import { Button, Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { createNewRepo } from "../store/dispatch/dispatch";
import { useHistory } from "react-router";
import { CREATE_REPO_RESET } from "../store/actionType";

function CategoryModal({ createNewRepo, createRepo }) {
  const [cate, setCate] = useState("letters");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    createNewRepo(cate === "letters" ? true : false);
    setCate("letters");
  };
  useEffect(() => {
    if (createRepo.data) {
      history.push(`/write-article/${createRepo.data._id}`);
    }
    if (createRepo.success) {
      dispatch({ type: CREATE_REPO_RESET });
    }
  }, [createRepo, history, dispatch]);
  return (
    <>
      <Modal.Header closeButton>
        <h6>Select a kind of your new article</h6>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Check
            type="radio"
            label="Cac Bai Viet"
            value="letters"
            name="group"
            checked
            onChange={(e) => setCate(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Sinh Hoat Giao Xu"
            value="parish-activities"
            name="group"
            onChange={(e) => setCate(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="confirmCreateArticle" onClick={handleSubmit}>
          Confirm
        </Button>
      </Modal.Footer>
    </>
  );
}

const mapDispatchToMaps = (dispatch) => ({
  createNewRepo: (isLetters) => createNewRepo(dispatch, isLetters),
});
const mapStateToProps = (state) => ({
  createRepo: state.createRepo,
});

export default connect(mapStateToProps, mapDispatchToMaps)(CategoryModal);
