import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
import "../css/ArticleItemList.css";

function ArticleItemList({ article }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(convertFromRaw(JSON.parse(article.content)))
    );
  }, [article]);
  return (
    <div className="col-12">
      {/* <!-- Single Upcoming Artile Area --> */}
      <div className="single-upcoming-events-area d-flex flex-wrap align-items-center">
        {/* <!-- Thumbnail --> */}
        <div className="upcoming-events-thumbnail">
          <img
            src={
              article.image
                ? article.image
                : "http://hvmatl.net/gallery/img/articles/article-logo.png"
            }
            alt=""
          />
        </div>
        {/* <!-- Content --> */}
        <div className="upcoming-events-content d-flex flex-wrap align-items-center">
          <div className="events-text">
            <h4>{article.title}</h4>
            <div className="events-meta">
              <a href={`/ArticleDetail/${article._id}`}>
                <i className="fa fa-calendar" aria-hidden="true"></i>
                {article.date}
              </a>
            </div>
            <div className="article-description">
              <Editor toolbarHidden readOnly editorState={editorState} />
            </div>

            {/* <p>{article.body.substring(0, 101) + "..."}</p> */}
            {/* <!-- <a href="#">Read More <i className="fa fa-angle-double-right"></i></a> --> */}
          </div>
          <div className="find-out-more-btn">
            <a
              href={`/ArticleDetail/${article._id}`}
              className="btn crose-btn btn-2"
            >
              Xem thêm
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleItemList;
