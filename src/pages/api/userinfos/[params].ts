import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import UserInfo from "../../../models/userinfo";
// import { connectDB, disconnectDB } from "../../../helpers/db_utils";
import connectDB from "../../../config/mongoDB";
import { UserInfoType } from "../../../store/features/userinfo/userinfoSlice";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params: string | string[] = req.query.params;
  const method: string = req.method!;

  // DBへのConecction設立(すでに存在した場合、そのコネクションを使用）＋接続確認
  try {
    await connectDB();
  } catch (error) {
    res.status(500).send({ message: "データベースへの接続に失敗しました。" });
    return;
  }

  if (method === "GET") {
    if (params === "get-all") {
      try {
        const userinfos: UserInfoType[] = await UserInfo.find({});
        console.log("fetching userinfos data success");
        res.status(201).send(userinfos);
      } catch (error) {
        console.log(`fetching userinfos data failed. Error:${error.message}`);
        res
          .status(500)
          .send({ message: "ユーザー情報の全件取得に失敗しました。" });
      }
    }
  }
  //POSTメソッドでのアクセスを処理
  if (method === "POST") {
    if (params === "get") {
      try {
        const uid: string = req.body.uid;
        const userinfo: UserInfoType = await UserInfo.findOne({ uid: uid });
        console.log("fetching userinfo data success");
        res.status(200).send(userinfo);
      } catch (error) {
        console.log(`fetching userinfo data failed. Error:${error.message}`);
        res.status(500).send({ message: "ユーザー情報の取得に失敗しました。" });
      }
    } else if (params === "add") {
      try {
        const new_userinfo: UserInfoType = {
          ...req.body,
          _id: mongoose.Types.ObjectId(),
        };
        const newUserInfo = new UserInfo(new_userinfo);
        const response_userinfo: UserInfoType = await newUserInfo.save();
        console.log("saving userinfo data success");
        res.status(201).send(response_userinfo);
      } catch (error) {
        console.log(`saving userinfo data failed. Error:${error.message}`);
        res.status(500).send({ message: "ユーザー情報の保存に失敗しました。" });
      }
    }
  }

  //全ての処理が抜けた後、disconnectする※重要※
  // try {
  //   await disconnectDB();
  // } catch (error) {
  //   res.status(500).send({ message: "データベースの切断に失敗しました。" });
  // }
}

export default handler;
