import type { NextApiRequest, NextApiResponse } from "next";
var express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const UserInfo = require("../models/userinfo");

//全ユーザーの情報を取得
router.get("/get-all-userinfo", (req: NextApiRequest, res: NextApiResponse) => {
  UserInfo.find({}).then((userinfos) => {
    console.log(userinfos);
    res.send(userinfos);
  });
});

//ユーザー情報(ログイン中)を取得
router.post("/get-userinfo", (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body.uid);
  const uid = req.body.uid;
  UserInfo.findOne({ uid: uid }).then((userinfo) => {
    console.log(userinfo);
    res.send(userinfo);
  });
});

router.post("/add-userinfo", (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  const new_userinfo = {
    ...req.body,
    _id: mongoose.Types.ObjectId(),
  };
  const newUserInfo = new UserInfo(new_userinfo);
  newUserInfo.save().then((userinfo) => {
    console.log(userinfo);
    res.send(userinfo);
  });
});

module.exports = router;
