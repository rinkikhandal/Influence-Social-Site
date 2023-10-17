import "dotenv/config";
import logger from "./src/utils/logger/logs";
import app from "./src/index";
import connectDB from "./src/utils/ConnectDb/connectDB";

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(process.env.PORT, async () => {
    logger.info(`Server is running on port ${process.env.PORT}...`);
  });
};
start();
