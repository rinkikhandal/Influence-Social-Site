{
  !otherUser ? (
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
          onClick={otherUser.followers.length > 0 ? showFollowers : null}
        >
          {otherUser.followers.length}
          <span className="ml-1 hover:underline ">followers</span>
        </button>
        <button
          className=" hover:text-primary-green-2"
          onClick={otherUser.following.length > 0 ? showFollowings : null}
        >
          {otherUser.following.length}
          <span className="ml-1 hover:underline  ">following</span>
        </button>
      </div>
      <div className="main-body-dash w-full columns-1 xl:columns-4 lg:columns-3  sm:columns-2 gap-y-4 gap-x-4  mb-20">
        <Posts posts={otherUser.posts} />
      </div>
    </div>
  );
}

// owner

{
  !user ? (
    // loading small
    <div className="h-screen w-full grid place-items-center ">
      <div className="grid place-items-center ">
        <div className="h-10 w-10 border-t-2 border-b-2 animate-spin border-t-primary-green-2 rounded-full border-b-primary-green-2 mb-5"></div>
        <h1 className="text-primary-green-1"> Loading...</h1>
      </div>
    </div>
  ) : (
    <div className="pt-[90px] px-5  w-full pb-20 max-w-[1240px] mx-auto">
      {/* <h1 className="heading mb-5 md:text-start">User Profile</h1> */}
      <div className="flex items-center mb-4 ">
        <span className="profile md:h-10 md:w-10 md:text-lg text-md cursor-default hover:bg-primary-green-1 ">
          {user.initials}
        </span>
        <p className="ml-2 capitalize text-lg text-primary-green-2 font-semibold">
          {user.fullName}
        </p>
      </div>
      <div className="flex mb-8 ml-2 text-sm">
        <button
          className="mr-3 hover:text-primary-green-2"
          onClick={showFollowers}
        >
          {user.followers.length}
          <span className="ml-1 hover:underline ">followers</span>
        </button>
        <button
          className=" hover:text-primary-green-2"
          onClick={showFollowings}
        >
          {user.following.length}
          <span className="ml-1 hover:underline  ">following</span>
        </button>
      </div>
      <div className="main-body-dash w-full columns-1 xl:columns-4 lg:columns-3  sm:columns-2 gap-y-4 gap-x-4  mb-20">
        <Posts posts={userPosts} />
      </div>
    </div>
  );
}
