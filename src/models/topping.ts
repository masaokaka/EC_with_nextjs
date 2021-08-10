import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ToppingSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  mprice: Number,
  lprice: Number,
});

export default mongoose.models.Topping ||
  mongoose.model("Topping", ToppingSchema);
