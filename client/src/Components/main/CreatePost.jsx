import { useState, useEffect, useCallback } from "react";
import Header from "../subComponents/Header";
import Footer from "../subComponents/Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const CreatePost = () => {
  // for updating post getting state from edit function
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("postId");
  const { loggedIn } = useSelector((state) => state.auth);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [creatingPost, setCreatingPost] = useState(null);
  const [openPreview, setOpenPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
    if (!postId) return;
    handleQueryPost();
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (openPreview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Clean up the effect when the component is unmounted or when the overlay is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openPreview]);

  // getting blob by fetching image url
  const handleQueryPost = useCallback(async () => {
    try {
      const resPost = await axiosInstance.get(`/post/${postId}`);
      const post = resPost.data;
      setTitle(post.title);
      setDescription(post.description);

      //  Fetch the image URL
      const res = await axios.get(post.image, { responseType: "arraybuffer" });
      // Convert image data to Blob
      const blob = new Blob([res.data], { type: "image/jpeg" });

      setImagePreview(blob);
      // setImage(imageFile);

      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handlePreview = (e) => {
    const file = e.target.files[0];
    const filereader = new FileReader();
    filereader.onload = () => {
      setImagePreview(filereader.result);
      setOpenPreview(true);
      setImage(file);
    };
    filereader.readAsDataURL(file);
  };
  // updating Post
  const handleUpdateSubmit = async (e) => {
    try {
      setCreatingPost(true);
      e.preventDefault();
      const postTitle = title;
      const postDescription = description;
      if (!title) {
        throw new Error("Please fill all the fields");
      }
      const formData = new FormData();
      formData.append("title", postTitle);
      formData.append("description", postDescription);
      if (image) {
        formData.append("image", image);
      }
      // console.log(postDescription, postTitle);
      // console.log("form entries", Object.fromEntries(formData));
      await axiosInstance.patch(`/post/${postId}`, formData);
      // console.log(res.data);
      // dispatch({
      //   type: UPDATE_POST,
      //   payload: { id: postId, updatedPost: res.data },
      // });
      toast.success("Post Updated Successfully");
      setImage(null);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setCreatingPost(false);
    }
  };

  // creating post
  const handleSubmit = async (e) => {
    try {
      setCreatingPost(true);
      e.preventDefault();
      const postTitle = title;
      const postDescription = description;
      if (!postTitle || !image) {
        throw new Error("Please fill all the fields");
      }
      // console.log(postTitle, postDescription);
      const formData = new FormData();
      formData.append("title", postTitle);
      formData.append("description", postDescription);
      formData.append("image", image);
      await axiosInstance.post("/post", formData);
      toast.success("Post Created Successfully");
      setImage(null);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setCreatingPost(false);
    }
  };

  const handleOpenPreview = () => {
    setOpenPreview(true);
  };

  const handlePreviewClose = () => {
    setOpenPreview(false);
  };

  return (
    <>
      <Header />
      {creatingPost !== null && creatingPost ? (
        <div className="h-screen w-full grid  place-items-center ">
          <div className="grid place-items-center ">
            <div className="h-10 w-10 border-t-2 border-b-2 animate-spin border-t-primary-green-2 rounded-full border-b-primary-green-2 mb-5"></div>
            <h1 className="text-primary-green-1">
              {postId ? "Updating Post..." : "Creating Post..."}
            </h1>
          </div>
        </div>
      ) : (
        <div className="pt-[90px] px-5  w-full pb-20">
          <h1 className=" heading">{postId ? "Edit Post" : "Create Post"} </h1>
          <form
            className="mt-6 px-5 border rounded-lg py-3 max-w-[800px] w-[100%] mx-auto "
            onSubmit={postId ? handleUpdateSubmit : handleSubmit}
          >
            <div>
              <label className="label-class font-semibold" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                placeholder="Your title..."
                autoComplete="title "
                className="inp-create capitalize "
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="description"
                className="label-class font-semibold"
              >
                Description{" "}
              </label>
              <textarea
                name="description"
                id="description"
                cols=""
                rows="10"
                value={description}
                placeholder="Type your message here..."
                onChange={(e) => setDescription(e.currentTarget.value)}
              ></textarea>
            </div>
            <div className="mt-4">
              <>
                <label htmlFor="image" className="label-class font-semibold">
                  Image
                </label>
                <div className="upload">
                  <label
                    htmlFor="image"
                    className="label-class mb-0 text-white text-sm"
                  >
                    Upload
                  </label>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="m8 8 4-4 4 4"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 4v12M19 17v.6c0 1.33-1.07 2.4-2.4 2.4H7.4C6.07 20 5 18.93 5 17.6V17"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    className="sr-only"
                    onChange={handlePreview}
                  />
                </div>
              </>
              {imagePreview ? (
                <div className="w-full mt-4">
                  <span
                    className="text-sm bg-secondary-green-1 text-white rounded-xl py-1 mb-5 inline-block  px-3 cursor-pointer"
                    onClick={handleOpenPreview}
                  >
                    See Preview
                  </span>
                  <span className="text-sm text-primary-green-2">
                    &ensp;- {postId ? title + ".jpg" : image.name}
                  </span>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="h-0 w-full border mt-5"></div>
            <div className="w-full ">
              <input
                type="submit"
                value={postId ? "Edit Post" : "Create Post"}
                className="btn  bg-primary-dark"
              />
            </div>
          </form>
        </div>
      )}
      <Footer />
      <Outlet />
      {imagePreview && openPreview && (
        <div className="overlay">
          <div className="mt-2 flex justify-center flex-col rounded-lg bg-neutral-200  px-12 py-5 relative ">
            <h1 className="mb-6 font-medium text-lg text-primary-dark">
              Preview
            </h1>
            <button className="absolute top-2 right-2 bg-tertiary-green-1 rounded-full p-2 cursor-pointer">
              <RxCross2 onClick={handlePreviewClose} className="h-5 w-5 " />
            </button>
            <div className="text-center">
              <img
                src={
                  imagePreview instanceof Blob
                    ? URL.createObjectURL(imagePreview)
                    : imagePreview
                }
                alt="Preview"
                className="max-h-[500px] rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
