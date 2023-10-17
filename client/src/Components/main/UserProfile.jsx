import { useCallback, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import Posts from "../subComponents/Posts";
import {
  unFollowUser,
  followUser,
  getUser,
  getFollowers,
  getFollowings,
} from "../../redux/actions/user";
import { BsCheck2 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import Header from "../subComponents/Header";
import Footer from "../subComponents/Footer";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const { otherUser, otherUserFollowers, otherUserFollowings } = useSelector(
    (state) => state.otherUser
  );

  const [show, setShow] = useState(null);

  const dispatch = useDispatch();

  const { userId } = useParams();
  useEffect(() => {
    fetchUser(userId);
  }, []);

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

  const fetchUser = useCallback((userId) => {
    dispatch(getUser(userId));
  }, []);

  const handleFollowUser = (id) => {
    if (user.following.includes(id)) {
      dispatch(unFollowUser(id));
    } else {
      dispatch(followUser(id));
    }
  };
  const getOtherUserFollowers = (userId) => {
    dispatch(getFollowers(userId));
    if (otherUserFollowers) {
      setShow(["followers", otherUserFollowers]);
      setIsOverlayOpen(true);
    }
  };
  const getOtherUserFollowings = (userId) => {
    dispatch(getFollowings(userId));
    if (otherUserFollowings) {
      setShow(["following", otherUserFollowings]);
      setIsOverlayOpen(true);
    }
  };

  const handleShowClose = () => {
    setIsOverlayOpen(false);
    setShow(null);
  };

  return (
    <>
      <Header />

      {!otherUser ? (
        // loading small
        <div className="h-screen w-full grid place-items-center ">
          <div className="grid place-items-center ">
            <div className="h-10 w-10 border-t-2 border-b-2 animate-spin border-t-primary-green-2 rounded-full border-b-primary-green-2 mb-5"></div>
            <h1 className="text-primary-green-1">Getting User Profile...</h1>
          </div>
        </div>
      ) : (
        <div className="pt-[90px] px-5  w-full pb-20 max-w-[1240px] mx-auto">
          <h1 className="heading mb-5 md:text-start">User Profile</h1>
          <div className="flex items-center mb-4 ">
            <span className="profile md:h-10 md:w-10 md:text-lg text-md cursor-default hover:bg-primary-green-1 ">
              {otherUser.initials}
            </span>
            <p className="ml-2 capitalize text-lg text-primary-green-2 font-semibold">
              {otherUser.fullName}
            </p>
            <button
              className="edit"
              onClick={() => handleFollowUser(otherUser._id)}
            >
              {user.following.includes(otherUser._id) ? (
                <>
                  <BsCheck2 /> <span className="ml-1">following</span>
                </>
              ) : (
                "follow"
              )}
            </button>
          </div>
          <div className="flex mb-8 ml-2 text-sm">
            <button
              className="mr-3 hover:text-primary-green-2"
              onClick={
                otherUser.followers.length > 0
                  ? () => getOtherUserFollowers(otherUser._id)
                  : null
              }
            >
              {otherUser.followers.length}
              <span className="ml-1 hover:underline ">followers</span>
            </button>
            <button
              className=" hover:text-primary-green-2"
              onClick={
                otherUser.following.length > 0
                  ? () => getOtherUserFollowings(otherUser._id)
                  : null
              }
            >
              {otherUser.following.length}
              <span className="ml-1 hover:underline  ">following</span>
            </button>
          </div>
          <div className="main-body-dash w-full columns-1 xl:columns-4 lg:columns-3  sm:columns-2 gap-y-4 gap-x-4  mb-20">
            <Posts posts={otherUser.posts} />
          </div>
        </div>
      )}

      <Footer />
      <Outlet />
      {show && show[1].length > 0 && (
        <div className="overlay ">
          <div className="bg-neutral-200 max-w-md w-[90%] px-4 pt-4 rounded-lg relative h-fit ">
            <h1 className="mb-8 capitalize font-semibold text-primary-dark text-xl">
              {show[0]}
            </h1>
            {show[1].map((person) => {
              return (
                <div key={person._id}>
                  <button className="absolute top-2 right-4 bg-tertiary-green-1 rounded-full p-2 cursor-pointer">
                    <RxCross2 onClick={handleShowClose} className="h-5 w-5 " />
                  </button>
                  <div className="flex items-center mb-4 justify-between ">
                    <div className="flex items-center">
                      <span className="profile md:h-10 md:w-10 text-md cursor-default hover:bg-primary-green-1 ">
                        {person.initials}
                      </span>
                      <p className="ml-2 capitalize text-lg  font-medium">
                        {person._id === user._id ? "You" : person.fullName}
                      </p>
                    </div>
                    {person._id !== user._id && (
                      <button
                        className="edit"
                        onClick={() => handleFollowUser(person._id)}
                      >
                        {user.following.includes(person._id) ? (
                          <>
                            <BsCheck2 /> <span className="ml-1">following</span>
                          </>
                        ) : (
                          "follow"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
