import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../css/WriteArticle.css";

import { connect } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import { getRepoContent, saveUpdateRepo } from "../store/dispatch/dispatch";
import { Button } from "react-bootstrap";
import UploadImageToCloud from "../components/UploadImageToCloud";

function WriteArticle({
  match,
  history,
  getRepoContent,
  repoContent,
  saveUpdateRepo,
  repoUpdated,
}) {
  const [editorState, setEditorState] = useState();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(
    "http://hvmatl.net/gallery/img/articles/article-logo.png"
  );
  const [newImage, setNewImage] = useState("");
  const [date, setDate] = useState(null);
  const contentId = match.params.id;

  const { loading, repo } = repoContent;
  const { success } = repoUpdated;

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  useEffect(() => {
    if (!repo || repo._id !== contentId || success) {
      getRepoContent(contentId);
    } else {
      setTitle(repo.title);
      setDate(repo.date);
      setImage(repo.image);
    }
    if (repo && repo?.content) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(repo.content)))
      );
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [getRepoContent, contentId, repo, success, history]);

  const saveArticle = () => {
    const article = {
      title: title ? title : null,
      content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      date: date,
      image: repo.isLetters ? image : null,
      _id: contentId,
    };
    saveUpdateRepo(article);
  };

  const handleChangeUrl = () => {
    if (newImage) {
      setImage(newImage);
      document
        .querySelector(".article__img-inputURL")
        .classList.remove("visible");
    }
  };

  const handleReviewBtn = () => {
    saveArticle();

    history.push(`/article-review/${contentId}`);
  };

  const handleBackBtn = () => {
    saveArticle();

    history.push("/article-repo");
  };

  return (
    <div>
      <Header />
      {loading && <LoadingBox />}

      <div className="writeArticle">
        <div className="events-area">
          <div className="container article__controler">
            {repo?.isLetters ? (
              <div className="article__review">
                <div className="article__img">
                  <img src={image ? image : null} alt="" />
                  <div
                    className="article__img-upload"
                    onClick={() => {
                      document
                        .querySelector(".article__img-inputURL")
                        .classList.add("visible");
                    }}
                  >
                    <Button className="article__img-upload-btn">
                      {/* <i className="fa fa-upload"></i> */}
                      Change
                    </Button>
                  </div>
                  <div className="article__img-inputURL">
                    <input
                      type="text"
                      placeholder="Paste URL here"
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                    />
                    <div className="article__img-groupBtn">
                      <Button
                        variant="danger"
                        onClick={() => {
                          document
                            .querySelector(".article__img-inputURL")
                            .classList.remove("visible");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button variant="success" onClick={handleChangeUrl}>
                        Upload
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="article__description">
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="article__description-title"
                  />
                  <input
                    type="text"
                    value={date}
                    placeholder={repo.date}
                    onChange={(e) => setDate(e.target.value)}
                    className="article__description-date"
                  />
                  <UploadImageToCloud />
                </div>
              </div>
            ) : (
              <div className="my-3">
                <h3 style={{ textAlign: "center" }}>Parish Activities</h3>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: "100%",
                    marginBottom: 10,
                    fontSize: 20,
                    padding: "5px 10px",
                    border: "1px solid lightgray",
                    borderRadius: 5,
                  }}
                />
                <UploadImageToCloud />
              </div>
            )}
            <div className="article__editor">
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                toolbarClassName="toolbar-class"
                onEditorStateChange={onEditorStateChange}
                placeholder="Enter your story..."
              />
            </div>
            <div className="group__button">
              <Button
                className="button-back"
                onClick={handleBackBtn}
                variant="secondary"
              >
                Repository
              </Button>

              <Button
                className="button-preview"
                variant="success"
                onClick={handleReviewBtn}
              >
                Review
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getRepoContent: (repoId) => getRepoContent(dispatch, repoId),
  saveUpdateRepo: (article) => saveUpdateRepo(dispatch, article),
});

const mapStateToProps = (state) => ({
  repoContent: state.repoContent,
  cloudImage: state.cloudImage,
  repoUpdated: state.repoUpdated,
});

export default connect(mapStateToProps, mapDispatchToProps)(WriteArticle);
