import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { connect, useDispatch } from "react-redux";
import { getRepoList } from "../store/dispatch/dispatch";
import "../css/ArticleRepo.css";
import DraftArticle from "../components/DraftArticle";
import { Button, Modal } from "react-bootstrap";
import CategoryModal from "../components/CategoryModal";
import {
  DELETE_REPO_RESET,
  REPO_CONTENT_RESET,
  SAVE_REPO_RESET,
} from "../store/actionType";

function ControlArticle({ repoDeleted, getRepoList, repoList, repoUpdated }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [cateId, setCateId] = useState("letters");
  const [headId, setHeadId] = useState("/Drafts");
  const dispatch = useDispatch();

  const closeModal = () => {
    setModalOpen(false);
  };

  const { success: successDeleted } = repoDeleted;
  const { success: successUpdated } = repoUpdated;

  const selectTab = (groupBtn, setId) => {
    for (var i = 0; i < groupBtn.length; i++) {
      const btn = groupBtn[i];
      btn.addEventListener("click", () => {
        for (var y = 0; y < groupBtn.length; y++) {
          groupBtn[y].classList.remove("active");
        }
        setId(btn.getAttribute("id"));
        btn.classList.add("active");
      });
    }
  };

  useEffect(() => {
    // Select Category
    const sideBtns = document.querySelectorAll(".sidebar ul li");
    selectTab(sideBtns, setCateId);

    // Select Drafts Or Posts
    const headBtn = document.querySelectorAll(".contents__headTable");
    selectTab(headBtn, setHeadId);

    if (successDeleted || successUpdated) {
      dispatch({ type: DELETE_REPO_RESET });
      dispatch({ type: SAVE_REPO_RESET });
    }
    dispatch({ type: REPO_CONTENT_RESET });

    getRepoList(cateId, headId);
  }, [cateId, successDeleted, dispatch, headId, getRepoList, successUpdated]);

  return (
    <div>

      <div className="events-area section-padding-100">
        <div className="container">
          <div className="row articles-container">
            {/* <!-- Articles Title --> */}
            <div className="col-12 mb-3">
              <div className="events-title">
                <center>
                  <h2>Repository</h2>
                  <Button
                    className="newArticleBtn"
                    onClick={() => setModalOpen(true)}
                  >
                    New Article
                  </Button>
                </center>
              </div>
            </div>
            {/* <!-- Articles List --> */}
            <div className="dashboard">
              <div className="sidebar">
                <div className="sidebar__headTable">
                  <h6>Category</h6>
                </div>
                <ul>
                  <li id="letters" className="active">
                    <strong>Cac Bai Viet</strong>
                  </li>
                  <li id="parish-activities">
                    <strong>Sinh hoat Giao xu</strong>
                  </li>
                </ul>
              </div>
              <div className="contents">
                <div className="contents__group">
                  <div className="contents__headTable active" id="/Drafts">
                    <h6>Drafts</h6>
                  </div>
                  <div className="contents__headTable" id="/Articles">
                    <h6>Posts</h6>
                  </div>
                </div>
                <ul>
                  {repoList.data?.length === 0 && (
                    <li>
                      <strong>
                        <i style={{ fontWeight: 100 }}>No Article</i>
                      </strong>
                    </li>
                  )}
                  {repoList.data?.map((article, idx) => (
                    <DraftArticle key={idx} article={article} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={modalOpen} onHide={closeModal}>
        <CategoryModal closeModal={closeModal} />
      </Modal>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getRepoList: (cateId, headId) => getRepoList(dispatch, cateId, headId),
});

const mapStateToProps = (state) => ({
  repoDeleted: state.repoDeleted,
  repoList: state.repoList,
  repoUpdated: state.repoUpdated,
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlArticle);
