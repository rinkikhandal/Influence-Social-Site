import mongoose from "mongoose";
import logger from "../logger/logs";

const connectDB = async (URI) => {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(URI);
    logger.warn("connected to th db...");
  } catch (error) {
    logger.error(error);
  }
};

export default connectDB;
