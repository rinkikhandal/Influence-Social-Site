import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Influence-social-site", // Optional: specify a folder in your Cloudinary account
    public_id: (req, file) => file.originalname.split(".")[0],
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 50,
  },
});

export default upload;
