import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserInfoSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  uid: String,
  name: String,
  username: String,
  email: String,
  tel: String,
  address: String,
  zipcode: String,
});

export default mongoose.models.UserInfo ||
  mongoose.model("UserInfo", UserInfoSchema);
