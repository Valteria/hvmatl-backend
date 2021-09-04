//TODO: Working on this
import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { connect } from "react-redux";
import { getRepoList } from "../store/dispatch/dispatch";
import LoadingBox from "../components/LoadingBox";
import ArticleItemList from "./ArticleItemList";

const Articles = ({ getRepoList, repoList }) => {
  const { loading, data } = repoList;
  useEffect(() => {
    getRepoList();
  }, [getRepoList]);

  return (
    <div>
      <Header />

      <div class="events-area section-padding-100">
        <div class="container">
          <div class="row articles-container">
            {/* <!-- Articles Title --> */}
            <div class="col-12">
              <div class="events-title">
                <center>
                  <h2>Các Bài Viết</h2>
                </center>
              </div>
            </div>
            {/* <!-- Articles List --> */}
            {loading && <LoadingBox />}
            {data?.length === 0 && (
              <div style={{ textAlign: "center", fontSize: 20, flex: 1 }}>
                <span>
                  <i>No Article</i>
                </span>
              </div>
            )}
            {data?.map((article, key) => (
              <ArticleItemList key={key} article={article} />
            ))}
            {/* <!--  pagination area --> */}
            {/* <!-- <div class="col-12">
                            <div class="pagination-area mt-70">
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination justify-content-center">
                                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item"><a class="page-link" href="#"><i
                                                    class="fa fa-angle-right"></i></a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div> --> */}
            {/* <!--  pagination area end --> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getRepoList: (cateId = "letters", headId = "/Posts") =>
    getRepoList(dispatch, cateId, headId),
});

const mapStateToProps = (state) => ({
  repoList: state.repoList,
});

export default connect(mapStateToProps, mapDispatchToProps)(Articles);

// /**
//  *
//  * @param {*} prop: list of all articles - available: article contents.
//  */

// const Articles = (prop) => {
//     return(
//         <div>
//             <Header/>
//             <div className="events-area section-padding-100">
//                 <div className="container">
//                     <div className="row articles-container">
//                         {/* <!-- Articles Title --> */}
//                         <div className="col-12">
//                             <div className="events-title text-center">
//                                 <h2>Các Bài Viết</h2>
//                             </div>
//                         </div>
//                         { prop.data.map(article => {
//                         return(
//                             <div className="col-12">
//                                 {/* <!-- Single Upcoming Artile Area --> */}
//                                 <div className="single-upcoming-events-area d-flex flex-wrap align-items-center">
//                                     {/* <!-- Thumbnail --> */}
//                                     <div className="upcoming-events-thumbnail">
//                                         <img src={article.thumbnail} alt=""/>
//                                     </div>
//                                     {/* <!-- Content --> */}
//                                     <div className="upcoming-events-content d-flex flex-wrap align-items-center">
//                                         <div className="events-text">
//                                             <h4>{article.title}</h4>
//                                             <div className="events-meta">
//                                                 <p><i className="fa fa-calendar" aria-hidden="true"></i>{article.date}</p>
//                                             </div>
//                                             <p>{article.snippet}</p>
//                                         </div>
//                                         <div className="find-out-more-btn">
//                                             <a href={article.url} className="btn crose-btn btn-2">Xem thêm</a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>);
//                         })
//                         }
//                     </div>
//                 </div>
//             </div>
//             <Footer/>
//         </div>
//     );
// }

// export default Articles;
