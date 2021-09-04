//TODO: Working on this
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { connect } from "react-redux";
import { getRepoContent } from "../store/dispatch/dispatch";
import LoadingBox from "../components/LoadingBox";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";

const ArticleDetail = ({ match, getRepoContent, repoContent }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { loading, repo } = repoContent;
  const id = match.params.id;
  useEffect(() => {
    getRepoContent(id);
  }, [getRepoContent, id]);

  useEffect(() => {
    if (repo) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(repo.content)))
      );
    }
  }, [repo]);

  return (
    <div>
      <Header />
      {loading && <LoadingBox />}
      {!repo ? (
        <h1>Article does not exist</h1>
      ) : (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: "<!-- ##### Blog Content Area Start ##### -->",
            }}
          />
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
                        <h2 class="post-title">{repo.title}</h2>
                        <Editor
                          readOnly
                          toolbarHidden
                          editorState={editorState}
                        />
                      </div>
                    </div>
                    {/* <!-- Post Details Area End --> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- ##### Blog Content Area End ##### --> */}
        </>
      )}

      <Footer />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getRepoContent: (id) => getRepoContent(dispatch, id),
});

const mapStateToProps = (state) => ({
  repoContent: state.repoContent,
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);
