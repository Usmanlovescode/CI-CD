import React from "react";
import Loader from "../common/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const Categorygrid = () => {
  const SourceId = useSelector(
    (state) =>
      state.SourceObj.selectedSourceId || localStorage.getItem("selectedSource")
  );
  const AuthorName = useSelector(
    (state) =>
      state.SourceObj.slectedAuthername || localStorage.getItem("authorname")
  );
  const [List, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [Catepage, setCatepage] = useState(1);
  const [Category, setCategory] = useState([]);
  const [Counter, setCounter] = useState();
  const [search, setsearch] = useState("");
  const [NextP, setNextP] = useState();
  const [authorCount, setauthorCount] = useState();
  const [Next, setNext] = useState();
  const [Previous, setPrevious] = useState(1);
  const [AuthorDe, setAuthorDe] = useState([]);
  const [AuthorDName, setAuthorName] = useState("");
  const [Authorsite, setAuthorsite] = useState("");
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  let authorname = "";

  const GetSourecDetaile = () => {
    setLoading(true);
    axios
      .get(
        ApiUrl + `api/news/all-news/?source_id=${SourceId}&page=${page}&size=18`
      )
      .then((res) => {
        setList(res.data.results);
        authorname = res.data.results[0].source?.name;
        setNext(res.data.next);
        setauthorCount(res.data.count);
        setPrevious(res.data.previous);
        setLoading(false);
      });
  };

  const fetchMoreAuthor = () => {
    if (Next) {
      setPage((page) => page + 1);
      axios
        .get(
          ApiUrl +
          `api/news/all-news/?source_id=${SourceId}&page=${page}&size=18`
        )
        .then((res) => {
          setList([...List, ...res.data.results]);
          authorname = res.data.results[0].source?.name;
          setNext(res.data.next);
          setauthorCount(res.data.count);
          setPrevious(res.data.previous);
          setLoading(false);
        });
    }
  };

  const GotoNewsDetaile = (Sname, Sid) => {
    localStorage.setItem("selectedSource", Sid);
    localStorage.setItem("authorname", Sname);
    dispatch(setSelectedSource(Sid, Sname))
      .then((res) => {
        const URL = Sname.replace(/\s+/g, "-");
        navigation("/news/" + URL);
      })
      .catch((err) => {
        console.log("redux ---", err);
      });
  };

  const AuthorDetailr = () => {
    if (AuthorName) {
      axios.get(ApiUrl + `api/news/source/`).then((res) => {
        const response = res.data.results;
        const logo = response?.filter((item) => item.name == AuthorName);
        setAuthorDe(logo[0]);
        setAuthorName[logo[0]?.name];
      });
    }
  };

  const fetchMoreData = () => {
    if (NextP) {
      setCatepage((Catepage) => Catepage + 1);
      if (search) {
        axios.get(ApiUrl + `api/news/category/?query=${search}`).then((res) => {
          setNextP(res.data.next);
          setCategory([...Category, ...res.data.results]);
          setCounter(res.data.count);
        });
      } else {
        axios
          .get(ApiUrl + `api/news/category/?page=${Catepage}&size=40`)
          .then((res) => {
            setNextP(res.data.next);
            setCategory([...Category, ...res.data.results]);
            setCounter(res.data.count);
          });
      }
    }
  };

  const Getcategory = () => {
    if (search) {
      axios.get(ApiUrl + `api/news/category/?query=${search}`).then((res) => {
        setNextP(res.data.next);
        setCategory(res.data.results);
        setCounter(res.data.count);
      });
    } else {
      axios
        .get(ApiUrl + `api/news/category/?page=${Catepage}&size=40`)
        .then((res) => {
          setNextP(res.data.next);
          setCategory(res.data.results);
          setCounter(res.data.count);
        });
    }
  };

  useEffect(() => {
    GetSourecDetaile();
    Getcategory();
    AuthorDetailr();
    window.scrollTo(0, 0);
  }, [search]);

  return (
    <>
      <div>
        {Loading ? <Loader /> : ""}
        <div className="main-wrap">
          <aside
            id="sidebar-wrapper"
            className="custom-scrollbar offcanvas-sidebar position-right"
          >
            <button className="off-canvas-close">
              <i className="ti-close" />
            </button>
            <div className="sidebar-inner">
              <div className="siderbar-widget mb-50 mt-30">
                <form
                  action="#"
                  method="get"
                  className="search-form position-relative"
                >
                  <input
                    type="text"
                    className="search_field"
                    placeholder="Search"
                    defaultValue
                    name="s"
                  />
                  <span className="search-icon">
                    <i className="ti-search mr-5" />
                  </span>
                </form>
              </div>
              <div className="sidebar-widget mb-50">
                <div className="widget-header mb-30">
                  <h5 className="widget-title">
                    Top <span>Trending</span>
                  </h5>
                </div>
                <div className="post-aside-style-2">
                  <ul className="list-post">
                    <li className="mb-30 wow fadeIn animated">
                      <div className="d-flex">
                        <div className="post-thumb d-flex mr-15 border-radius-5 img-hover-scale">
                          <Link className="color-white" to="/single">
                            <img src="assets/imgs/thumbnail-2.jpg" alt />
                          </Link>
                        </div>
                        <div className="post-content media-body">
                          <h6 className="post-title mb-10 text-limit-2-row">
                            <Link to="/single">
                              Vancouver woman finds pictures and videos of
                              herself online
                            </Link>
                          </h6>
                          <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                            <span className="post-by">
                              By <Link to="/author">Stormvik</Link>
                            </span>
                            <span className="post-on">4m ago</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="mb-30 wow fadeIn animated">
                      <div className="d-flex">
                        <div className="post-thumb d-flex mr-15 border-radius-5 img-hover-scale">
                          <Link className="color-white" to="/single">
                            <img src="assets/imgs/thumbnail-3.jpg" alt />
                          </Link>
                        </div>
                        <div className="post-content media-body">
                          <h6 className="post-title mb-10 text-limit-2-row">
                            <Link to="/single">
                              4 Things Emotionally Intelligent People Don’t Do
                            </Link>
                          </h6>
                          <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                            <span className="post-by">
                              By <Link to="/author">Stormvik</Link>
                            </span>
                            <span className="post-on">3h ago</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="mb-30 wow fadeIn animated">
                      <div className="d-flex">
                        <div className="post-thumb d-flex mr-15 border-radius-5 img-hover-scale">
                          <Link className="color-white" to="/single">
                            <img src="assets/imgs/thumbnail-5.jpg" alt />
                          </Link>
                        </div>
                        <div className="post-content media-body">
                          <h6 className="post-title mb-10 text-limit-2-row">
                            <Link to="/single">
                              Reflections from a Token Black Friend
                            </Link>
                          </h6>
                          <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                            <span className="post-by">
                              By <Link to="/author">Stormvik</Link>
                            </span>
                            <span className="post-on">4h ago</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="mb-30 wow fadeIn animated">
                      <div className="d-flex">
                        <div className="post-thumb d-flex mr-15 border-radius-5 img-hover-scale">
                          <Link className="color-white" to="/single">
                            <img src="assets/imgs/thumbnail-7.jpg" alt />
                          </Link>
                        </div>
                        <div className="post-content media-body">
                          <h6 className="post-title mb-10 text-limit-2-row">
                            <Link to="/single">
                              How to Identify a Smart Person in 3 Minutes
                            </Link>
                          </h6>
                          <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                            <span className="post-by">
                              By <Link to="/author">Stormvik</Link>
                            </span>
                            <span className="post-on">5h ago</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="wow fadeIn animated">
                      <div className="d-flex">
                        <div className="post-thumb d-flex mr-15 border-radius-5 img-hover-scale">
                          <Link className="color-white" to="/single">
                            <img src="assets/imgs/thumbnail-8.jpg" alt />
                          </Link>
                        </div>
                        <div className="post-content media-body">
                          <h6 className="post-title mb-10 text-limit-2-row">
                            <Link to="/single">
                              Blackface Minstrel Songs Don’t Belong in
                              Children’s Music Class
                            </Link>
                          </h6>
                          <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                            <span className="post-by">
                              By <Link to="/author">Stormvik</Link>
                            </span>
                            <span className="post-on">5h30 ago</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="sidebar-widget widget_tag_cloud mb-50">
                <div className="widget-header tags-close mb-20">
                  <h5 className="widget-title mt-5">Tags Cloud</h5>
                </div>
                <div className="tagcloud">
                  <Link to="/category">Beauty</Link>
                  <Link to="/category">Book</Link>
                  <Link to="/category">Design</Link>
                  <Link to="/category">Fashion</Link>
                  <Link to="/category">Lifestyle</Link>
                  <Link to="/category">Travel</Link>
                  <Link to="/category">Science</Link>
                  <Link to="/category">Health</Link>
                  <Link to="/category">Sports</Link>
                  <Link to="/category">Arts</Link>
                  <Link to="/category">Books</Link>
                  <Link to="/category">Style</Link>
                </div>
              </div>
              <div className="sidebar-widget widget-ads mb-30">
                <div className="widget-header tags-close mb-20">
                  <h5 className="widget-title mt-5">Your Ads Here</h5>
                </div>
                <Link
                  to="/assets/imgs/news-1.jpg"
                  className="play-video"
                  data-animate="zoomIn"
                  data-duration="1.5s"
                  data-delay="0.1s"
                >
                  <img
                    className="border-radius-10"
                    src="assets/imgs/ads-1.jpg"
                    alt
                  />
                </Link>
              </div>
            </div>
          </aside>
          <Header />
          <main className="position-relative">
            <div className="archive-header text-center mb-50">
              <div className="container">
                <h2>
                  <span className="text-danger">{AuthorName}</span>
                  <span className="post-count">{authorCount} articles</span>
                </h2>
                <div className="breadcrumb">
                  <span className="no-arrow">You are here:</span>
                  <Link to="/" rel="nofollow">
                    Home
                  </Link>
                  <span />
                  {AuthorName}
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12 col-md-12 order-1 order-md-2">
                  <div className="row mb-50 pr-4">
                    <div className="col-lg-9 col-md-12 ">
                      <div className="latest-post mb-50">
                        <div className="loop-grid">
                          <InfiniteScroll
                            dataLength={List.length}
                            next={() => fetchMoreAuthor()}
                            // loader={<h4>Loading ... </h4>}
                            hasMore={true}
                            scrollThreshold={0.5}
                          // scrollableTarget="scrollableDiv"
                          >
                            <div className="loop-list-style-1 custom_Authorgrid">
                              {List?.map((item) => {
                                return (
                                  <article className="p-10 background-white border-radius-10 mb-30 wow fadeIn animated">
                                    <div className="d-flex">
                                      <div className="post-thumb d-flex mr-15 border-radius-15 img-hover-scale">
                                        <a
                                          className="color-white"
                                          onClick={() =>
                                            GotoNewsDetaile(item.title, item.id)
                                          }
                                        >
                                          <img
                                            className="border-radius-15"
                                            src={item.image}
                                            alt
                                          />
                                        </a>
                                      </div>
                                      <div
                                        className="post-content media-body"
                                        style={{ width: "calc(100% - 150px)" }}
                                      >
                                        <div className="entry-meta mb-15 mt-10">
                                          <Link
                                            className="entry-meta meta-2"
                                            onClick={() =>
                                              GotoCategoryDetaile(
                                                item.category?.name,
                                                item.category?.id,
                                                item.category?.news_count
                                              )
                                            }
                                          >
                                            <span className="post-in text-danger font-x-small">
                                              {item.category?.name}
                                            </span>
                                          </Link>
                                        </div>
                                        <h5 className="post-title mb-15 text-limit-2-row">
                                          <span className="post-format-icon">
                                            <ion-icon name="videocam-outline" />
                                          </span>
                                          <a
                                            onClick={() =>
                                              GotoNewsDetaile(
                                                item.title,
                                                item.id
                                              )
                                            }
                                          >
                                            {item.title}
                                          </a>
                                        </h5>
                                        <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                                          <span className="post-by">
                                            By{" "}
                                            <a
                                              onClick={() =>
                                                GotoSourceDetaile(
                                                  item.source?.name,
                                                  item.source?.id
                                                )
                                              }
                                            >
                                              {item.source?.name}
                                            </a>
                                          </span>
                                          {/* <span className="post-on"></span> */}
                                          <span className="time-reading">
                                            {new Date(
                                              item.published_on
                                            ).getFullYear()}
                                            -
                                            {new Date(
                                              item.published_on
                                            ).getMonth()}
                                            -
                                            {new Date(
                                              item.published_on
                                            ).getDate()}{" "}
                                            &nbsp;{" "}
                                            {new Date(
                                              item.published_on
                                            ).getHours()}
                                            :
                                            {new Date(
                                              item.published_on
                                            ).getMinutes()}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </article>
                                );
                              })}
                            </div>
                          </InfiniteScroll>
                        </div>
                      </div>
                      {/* <div className="pagination-area mb-30">
                      <nav aria-label="Page navigation example">
                      <ul className="pagination justify-content-center">
                          {
                            Previous ?
                              <li onClick={() => setPage((page) => page - 1)} className="page-item active mr-30"><Link className="page-link" ><i className="ti-angle-left" /></Link></li>
                              : ""}

                          {
                            Next ?
                              <li onClick={() => setPage((page) => page + 1)} className="page-item active ml-30"><Link className="page-link"><i className="ti-angle-right" /></Link></li>
                              : ""
                          }
                        </ul>
                      </nav>
                    </div> */}
                    </div>
                    <div className="col-lg-3 col-md-12 sidebar-right">
                      <DateTime />

                      <div className="sidebar-widget mb-50">
                        <div className="widget-header mb-30 bg-white border-radius-10 p-15">
                          <h5 className="widget-title mb-0">{AuthorDName}</h5>
                          <div className="post-aside-style-2">
                            <ul className="list-post">
                              <li
                                className="mb-30 wow fadeIn  animated"
                                style={{
                                  visibility: "visible",
                                  "-webkit-animation-name": "_fadeIn",
                                  "animation-name": "_fadeIn",
                                }}
                              >
                                <a href={AuthorDe.url} target="_blank">
                                  <div className="d-flex mt-4">
                                    <div className="post-thumb d-flex mr-15 border-radius-5 img-hover-scale">
                                      <Link className="color-white">
                                        <img src={AuthorDe.logo} alt />
                                      </Link>
                                    </div>
                                    <div className="post-content media-body">
                                      <h6 className="post-title mb-10 text-limit-2-row">
                                        <Link>{AuthorDe.title}</Link>
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                                    {/* <span className="post-by">By <Link to="/author">Stormvik</Link></span> */}
                                    <span className="post-on">
                                      {AuthorDe.description}
                                    </span>
                                  </div>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="sidebar-widget widget_categories border-radius-10 bg-white mb-30">
                        <div className="widget-header position-relative mb-15 header-style-2">
                          <h5
                            className="widget-title"
                            style={{ textAlign: "center" }}
                          >
                            <strong>{Counter} Categories</strong>
                          </h5>
                          <form class="search-form  position-relative  ">
                            <input
                              onChange={(e) => {
                                setsearch(e.target.value);
                              }}
                              type="text"
                              class="search_field w-100"
                              placeholder="Search Country"
                            />
                            <span
                              onClick={() => Getcategory()}
                              class="search-icon "
                            >
                              <i class="ti-search mr-5"></i>
                            </span>
                          </form>
                        </div>
                        <ul
                          className="font-small text-muted"
                          style={{
                            height: "calc(100vh - 200px)",
                            overflow: "auto",
                          }}
                        >
                          <InfiniteScroll
                            dataLength={Category.length}
                            next={() => fetchMoreData()}
                            // loader={<h4>Loading ... </h4>}
                            hasMore={true}
                            scrollThreshold={0.5}
                          // scrollableTarget="scrollableDiv"
                          >
                            {Category?.map((item) => {
                              return (
                                <li className="cat-item cat-item-2">
                                  <Link
                                    className="mnglscontent pr-2"
                                    onClick={() =>
                                      GotoCategoryDetaile(
                                        item.name,
                                        item.id,
                                        item.news_count
                                      )
                                    }
                                  >
                                    <span
                                      style={{ fontFamily: "Times Roman" }}
                                      className="leftconinspn"
                                    >
                                      {item.name}
                                    </span>
                                    <span className="rightconinspn">
                                      {item.news_count}
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </InfiniteScroll>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Categorygrid;
