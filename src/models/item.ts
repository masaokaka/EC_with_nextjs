import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    maxlength: 10,
  },
  text: String,
  mprice: Number,
  lprice: Number,
  img: String,
});

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);
