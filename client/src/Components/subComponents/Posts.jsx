import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { likePosts, unLikePosts } from "../../redux/actions/posts";
import ShowPostComponent from "./ShowPostComponent";
import PropTypes from "prop-types";

const Posts = ({ posts }) => {
  const { user } = useSelector((state) => state.auth);
  const [showPost, setShowPost] = useState(null);
  const dispatch = useDispatch();

  const handleLikeClick = (e, post) => {
    const {
      user: { _id: userId },
      _id: postId,
      likes,
    } = post;
    if (userId === user._id) return;

    if (likes.includes(user._id)) {
      dispatch(unLikePosts(postId));
    } else {
      dispatch(likePosts(postId));
    }
  };

  const handlePostClick = (e, id) => {
    const isLikeButton = e.target.closest(".like-button");
    if (isLikeButton) {
      return;
    }
    const singlePost = posts.find((post) => post._id === id);
    setShowPost(singlePost);
  };
  //==== to close the post when clicked outside of post====
  const handleClickOnOverlay = (e) => {
    const isShowComponent = e.target.closest(".main-show-component");
    if (isShowComponent) return;
    handleClosePost();
  };

  const handleClosePost = () => {
    setShowPost(null);
  };

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => {
          return (
            <article
              key={post._id}
              className="relative mb-6 cursor-pointer [&:hover>div]:visible"
              onClick={(e) => handlePostClick(e, post._id)}
            >
              <img
                src={post.image}
                alt={post.title}
                className="rounded-lg cover center "
              />
              <div className="bg-black bg-opacity-50 absolute top-0 w-[100%] rounded-lg  h-[100%]  p-4 flex flex-col invisible justify-between ">
                <div className="flex justify-between w-[100%]  items-center drop-shadow-md">
                  <div className="flex items-center">
                    <h1 className="bg-green-600 text-white rounded-full text-base h-11 w-11 grid place-items-center uppercase">
                      {post.user.initials}
                    </h1>
                    <span className="text-white  ml-2 w-20 overflow-hidden whitespace-nowrap overflow-ellipsis capitalize">
                      {post.user._id === user._id ? "You" : post.user.fullName}
                    </span>
                  </div>
                  <p
                    className="like-button text-white flex items-center bg-white bg-opacity-30 px-3 py-2 rounded-3xl z-70"
                    onClick={(e) => handleLikeClick(e, post)}
                  >
                    <span>{post.likes.length}</span>

                    {post.likes.includes(user._id) ? (
                      <AiFillHeart className={"text-rose-500 ml-3 h-6 w-6 "} />
                    ) : (
                      // hover:animate-custom-scale
                      <AiOutlineHeart
                        className={
                          post.user._id === user._id
                            ? "ml-3 h-6 w-6 "
                            : "ml-3 h-6 w-6 hover:animate-custom-scale"
                        }
                      />
                    )}
                  </p>
                </div>
                <div className="">
                  <h1 className=" text-base font-medium text-white  capitalize">
                    {post.title}
                  </h1>
                  <p className="text-sm text-white line-clamp-3  leading-[20px] ">
                    {post.description}
                  </p>
                </div>
              </div>
            </article>
          );
        })
      ) : (
        <></>
      )}

      {showPost && (
        <div>
          <div className="overlay" onClick={handleClickOnOverlay}>
            <ShowPostComponent post={showPost} onClose={handleClosePost} />
          </div>
        </div>
      )}
    </>
  );
};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;
