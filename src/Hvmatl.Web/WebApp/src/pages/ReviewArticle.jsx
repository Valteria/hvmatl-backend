import React, { useEffect, useState } from "react";
import "../css/ReviewArticle.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { connect, useDispatch } from "react-redux";
import {
  deleteRepo,
  getRepoContent,
  postRepo,
} from "../store/dispatch/dispatch";
import LoadingBox from "../components/LoadingBox";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
import { Button } from "react-bootstrap";
import {
  DELETE_REPO_RESET,
  POST_REPO_RESET,
  SAVE_REPO_RESET,
} from "../store/actionType";
import { Modal } from "react-bootstrap";

function ReviewArticle({
  getRepoContent,
  match,
  repoContent,
  history,
  postRepo,
  repoPosted,
  repoUpdated,
  deleteRepo,
  repoDeleted,
}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { loading, repo } = repoContent;
  const { loading: loadingPosted, success: successPosted } = repoPosted;
  const { loading: loadingDeleted, success: successDeleted } = repoDeleted;
  const { success: successUpdated } = repoUpdated;
  const [postModal, setPostModal] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    getRepoContent(match.params.id);
    if (successUpdated || successPosted || successDeleted) {
      dispatch({ type: POST_REPO_RESET });
      dispatch({ type: SAVE_REPO_RESET });
      dispatch({ type: DELETE_REPO_RESET });
    }
    if (successPosted || successDeleted) {
      history.push("/article-repo");
    }
  }, [
    match.params.id,
    getRepoContent,
    successPosted,
    history,
    dispatch,
    successUpdated,
    successDeleted,
  ]);

  useEffect(() => {
    if (repo && repo?.content) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(repo.content)))
      );
    }
    if (isPost) {
      postRepo(repo);
    }
    if (isDelete) {
      deleteRepo(repo._id);
    }
  }, [repo, isPost, postRepo, isDelete, deleteRepo]);

  const postModelClose = () => {
    setPostModal(false);
  };

  return (
    <div>
      <Header />
      <div className="reviewArticle__container">
        {loading && <LoadingBox />}
        {repo && (
          <section class="blog-content-area section-padding-100">
            <div class="container">
              <div class="row justify-content-between">
                {/* <!-- Blog Posts Area --> */}
                <div class="col-12 col-lg-12">
                  <div class="blog-posts-area">
                    {/* <!-- Post Details Area Start --> */}

                    <div class="single-post-details-area">
                      {/* <!-- <div class="post-thumbnail mb-30 col-12 col-lg-2"><img src="" alt=""></div> --> */}

                      <div class="post-content col-12 col-lg-auto">
                        {repo.isLetters ? (
                          <h2 class="post-title">{repo.title}</h2>
                        ) : (
                          <h2 class="post-title">Parish Activies</h2>
                        )}
                        <Editor
                          readOnly
                          toolbarHidden
                          editorState={editorState}
                        />
                      </div>
                    </div>
                    {/* <!-- Post Details Area End --> */}
                  </div>
                  <div className="reviewArticle__buttonGroup">
                    <Button
                      variant="primary"
                      onClick={() => history.push(`/write-article/${repo._id}`)}
                    >
                      Editor
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => history.push(`/article-repo`)}
                    >
                      Repository
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setPostModal(true);
                        setSelectedBtn("delete");
                      }}
                    >
                      {loadingDeleted ? <LoadingBox /> : "Delete"}
                    </Button>
                    {!repo.isPublish && (
                      <Button
                        variant="success"
                        onClick={() => {
                          setPostModal(true);
                          setSelectedBtn("post");
                        }}
                      >
                        {loadingPosted ? <LoadingBox /> : "Post"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Modal show={postModal} onHide={postModelClose}>
              <Modal.Header>
                <div>
                  Are you wanting to {selectedBtn + " "}
                  <b>
                    <i>{repo.title ? repo.title : repo.date}.</i>
                  </b>
                </div>
              </Modal.Header>
              <Modal.Footer>
                <Button variant="secondary" onClick={postModelClose}>
                  Cancel
                </Button>
                <Button
                  variant={
                    selectedBtn === "post"
                      ? "success"
                      : selectedBtn === "delete" && "danger"
                  }
                  onClick={() =>
                    selectedBtn === "post"
                      ? setIsPost(true)
                      : selectedBtn === "delete" && setIsDelete(true)
                  }
                >
                  {selectedBtn === "post"
                    ? "Post"
                    : selectedBtn === "delete" && "Delete"}
                </Button>
              </Modal.Footer>
            </Modal>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  repoContent: state.repoContent,
  repoPosted: state.repoPosted,
  repoUpdated: state.repoUpdated,
  repoDeleted: state.repoDeleted,
});

const mapDispatchToProps = (dispatch) => ({
  getRepoContent: (repoId) => getRepoContent(dispatch, repoId),
  postRepo: (repo) => postRepo(dispatch, repo),
  deleteRepo: (repoId) => deleteRepo(dispatch, repoId),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewArticle);
