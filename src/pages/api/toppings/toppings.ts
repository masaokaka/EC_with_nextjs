import type { NextApiRequest, NextApiResponse } from "next";
var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Topping = require("../models/topping");


//トッピング追加処理
router.post("/add-topping", (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  const new_topping = {
    ...req.body,
    _id: mongoose.Types.ObjectId(),
  };
  const newTopping = new Topping(new_topping);
  newTopping.save().then((topping) => {
    console.log(topping);
    res.send(topping);
  });
});

//トッピング削除処理
router.post("/delete-topping", (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body._id);
  const _id = req.body._id;
  Topping.findByIdAndDelete(_id).then((deletedTopping) => {
    res.send({ deletedTopping });
  });
});

module.exports = router;
