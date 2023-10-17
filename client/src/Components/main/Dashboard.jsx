import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import Header from "../subComponents/Header";
import Footer from "../subComponents/Footer";
import { fetchAllPosts } from "../../redux/actions/posts";
import Posts from "../subComponents/Posts";
// import toast from "react-hot-toast";

const Dashboard = () => {
  const { allPosts } = useSelector((state) => state.post);
  const { loggedIn } = useSelector((state) => state.auth);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
    fetchPosts();
    setIsLoadingImages(false);
  }, [loggedIn, navigate]);

  const fetchPosts = useCallback(() => {
    dispatch(fetchAllPosts());
  }, []);

  return (
    <>
      <Header />
      {isLoadingImages ? (
        // loading small
        <div className="h-screen w-full grid place-items-center ">
          <div className="grid place-items-center ">
            <div className="h-10 w-10 border-t-2 border-b-2 animate-spin border-t-primary-green-2 rounded-full border-b-primary-green-2 mb-5"></div>
            <h1 className="text-primary-green-1">Loading Posts...</h1>
          </div>
        </div>
      ) : (
        <div className="grid justify-center px-10 md:px-14 mb-20 pt-28">
          <div className="main-body-dash max-w-[1240px] columns-1 xl:columns-4 lg:columns-3  sm:columns-2  gap-y-4 gap-x-4  mb-20">
            <Posts posts={allPosts} />
          </div>
        </div>
      )}

      <Footer />
      <Outlet />
    </>
  );
};

export default Dashboard;
