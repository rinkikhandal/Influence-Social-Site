import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);
// mongoose.connection.once("open", () => {
//   Post.collection.createIndex({ user: 1, title: 1 }, { unique: true });
// });

export default Post;
