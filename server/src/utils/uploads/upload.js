import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.resolve(), "/public/uploads"));
    console.log(path.join(path.resolve(), "/public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 50,
  },
});

export default upload;
