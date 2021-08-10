import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_DB_TABLE_PATH!, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
    });
    console.log("db connection success");
  } catch (error) {
    console.log(`db connection failed. Error:${error.message}`);
    throw new Error(error.message);
  }
};

export default connectDB;
