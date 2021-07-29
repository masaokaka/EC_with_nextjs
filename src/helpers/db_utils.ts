import mongoose from "mongoose";

//mongoDBとの接続
export const connectDB = async () => {
  if (process.env.MONGO_DB_TABLE_PATH) {
    try {
      const client = await mongoose.connect(
        process.env.MONGO_DB_TABLE_PATH,
        {
          useFindAndModify: false,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } //findAndmodifyメソッドは使いません、という指定。(findOneAndUpdateなどがあるため)
      );
      console.log("db connection success");
    } catch (error) {
      console.log(`db connection failed. Error:${error.message}`);
      throw new Error(error);
    }
  }
};

export const disconnectDB = async () => {
  mongoose.connection
    .close()
    .then(() => console.log("db disconnection success"))
    .catch((error) => {
      console.log(`db connection failed. Error:${error.message}`);
      throw new Error(error);
    });
};
