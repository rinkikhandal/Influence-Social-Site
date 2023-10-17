import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";
import { BsCheck2 } from "react-icons/bs";
// import { FaRegEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { unFollowUser, followUser } from "../../redux/actions/user";
import { useNavigate } from "react-router-dom";

const ShowPostComponent = ({ post, onClose }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Apply overflow: hidden to the body when the overlay is open
  useEffect(() => {
    if (isOverlayOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up the effect when the component is unmounted or when the overlay is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOverlayOpen]);

  const handleClose = () => {
    setIsOverlayOpen(false);
    onClose();
  };

  if (!isOverlayOpen) {
    return null;
  }

  const handleEditPost = (id) => {
    navigate(`/create-post?postId=${id}`);
  };

  const handleFollowUser = (id) => {
    if (user.following.includes(id)) {
      dispatch(unFollowUser(id));
    } else {
      dispatch(followUser(id));
    }
    // console.log("handleFollowUser");
  };

  const handleUserProfile = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="main-show-component w-full h-fit  md:mt-10 mb-10 max-w-4xl  p-4  bg-neutral-200  rounded-lg relative ">
      <div className="flex flex-col md:flex-row-reverse gap-x-4">
        <div className="flex-grow-1 flex-shrink-0 md:w-[50%] ">
          <section className=" flex flex-col md:flex-col-reverse mb-1 md:mb-0">
            <div className=" capitalize mt-0 md:mb-1 mb-2  text-xl font-semibold tracking-wider md:pl-2 ">
              {post.title}
            </div>
            <div className=" flex items-center justify-between mb-5  md:mb-2">
              <div className="owner flex items-center ">
                <span
                  className="profile md:h-10 md:w-10 md:text-lg text-md"
                  onClick={
                    post.user._id === user._id
                      ? null
                      : () => handleUserProfile(post.user._id)
                  }
                >
                  {post.user.initials}
                </span>
                <p className="ml-2 capitalize font-semibold">
                  {post.user._id === user._id ? "You" : post.user.fullName}
                </p>
                {post.user._id === user._id ? (
                  <span className="ml-16 text-primary-dark flex items-center rounded-full  justify-center cursor-pointer  [&:hover>ul]:visible [&:hover>p]:visible  transition-all relative ">
                    <label>•••</label>

                    <ul className="bg-transparent absolute invisible top-6 -left-3 w-14  z-10">
                      <li className="absolute bg-primary-dark -top-1 rotate-45 left-5 h-3 w-3 -z-10"></li>
                      <li
                        className="bg-primary-dark text-xs text-white tracking-widest text-center py-1 "
                        onClick={() => handleEditPost(post._id)}
                      >
                        Edit
                      </li>
                    </ul>
                  </span>
                ) : (
                  <button
                    className="edit"
                    onClick={() => handleFollowUser(post.user._id)}
                  >
                    {user.following.includes(post.user._id) ? (
                      <>
                        <BsCheck2 /> <span className="ml-1">following</span>
                      </>
                    ) : (
                      "follow"
                    )}
                  </button>
                )}
              </div>
              <div className="absolute top-3 right-4 bg-tertiary-green-1 rounded-full p-2  cursor-pointer">
                <RxCross2 onClick={handleClose} className="h-5 w-5 " />
              </div>
            </div>
          </section>
          <section className="md:block hidden px-2">
            {post.description ? (
              <>
                {/* <h1 className="border-b border-b-neutral-custom pb-1 font-medium w-[90%]">
                  Description
                </h1> */}
                <div className="des-text">{post.description}</div>
              </>
            ) : (
              <></>
            )}
          </section>
        </div>
        <section className="grid place-items-center md:block w-full md:w-[50%]">
          <img
            src={post.image}
            alt={post.title}
            className="rounded-lg max-w-[500px] w-full "
          />
        </section>
      </div>

      <section className="md:hidden mt-5 w-[90%] mx-auto">
        {post.description ? (
          <>
            <h1 className="border-b border-b-neutral-custom pb-1 font-medium w-[85%]">
              Description
            </h1>
            <div className="des-text">{post.description}</div>
          </>
        ) : (
          <></>
        )}
      </section>
    </div>
  );
};

ShowPostComponent.propTypes = {
  post: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ShowPostComponent;
