import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { connect } from "react-redux";
import { getRepoList } from "../store/dispatch/dispatch";
import LoadingBox from "../components/LoadingBox";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";

const ActivitiesPage = ({ getRepoList, repoList }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { loading, data } = repoList;

  useEffect(() => {
    getRepoList();
  }, [getRepoList]);

  useEffect(() => {
    if (data?.length > 0) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(data[0].content))
        )
      );
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [data]);

  return (
    <>
      <Header />
      <section className="blog-content-area section-padding-100">
        <div className="container">
          <div className="row justify-content-between">
            <div class="col-12 col-lg-12">
              <div class="blog-posts-area">
                <div class="single-post-details-area">
                  <div class="post-content col-12 col-lg-auto">
                    <h2 className="section-heading">Sinh Hoạt Giáo Xứ</h2>
                    {loading && <LoadingBox />}
                    {data?.length > 0 ? (
                      <Editor
                        readOnly
                        toolbarHidden
                        editorState={editorState}
                      />
                    ) : (
                      <div style={{ textAlign: "center", fontSize: 20 }}>
                        <span>
                          <i>No Article</i>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getRepoList: (cateId = "activities", headId = "/Posts") =>
    getRepoList(dispatch, cateId, headId),
});

const mapStateToProps = (state) => ({
  repoList: state.repoList,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesPage);
