import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Topping from "../../../models/topping";
// import { connectDB, disconnectDB } from "../../../helpers/db_utils";
import connectDB from "../../../config/mongoDB";
import { ToppingType } from "../../../store/features/topping/toppingsSlice";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params: string | string[] = req.query.params;
  const method: string = req.method!;

  // DBへの接続確認
  try {
    await connectDB();
  } catch (error) {
    res.status(500).send({ message: "データベースへの接続に失敗しました。" });
    return;
  }

  if (method === "GET") {
    if (params === "fetch-all") {
      try {
        const toppings = await Topping.find({});
        console.log("fetching toppings data success");
        res.status(200).send(toppings);
      } catch (error) {
        console.log(`fetching toppings data failed. Error:${error.message}`);
        res
          .status(500)
          .send({ message: "トッピング情報の取得に失敗しました。" });
      }
    }
  }
  //POSTメソッドでのアクセスを処理
  if (method === "POST") {
    if (params === "add") {
      try {
        const new_topping: ToppingType = {
          ...req.body,
          _id: mongoose.Types.ObjectId(),
        };
        const newTopping = new Topping(new_topping);
        const response_topping: ToppingType = await newTopping.save();
        console.log("saving topping data success");
        res.status(200).send(response_topping);
      } catch (error) {
        console.log(`saving topping data failed. Error:${error.message}`);
        res
          .status(500)
          .send({ message: "トッピング情報の追加に失敗しました。" });
      }
    } else if (params === "delete") {
      try {
        const _id: string = req.body._id;
        await Topping.findByIdAndDelete(_id);
        console.log("deleting topping data success");
        res.status(200).end();
      } catch (error) {
        console.log(`deleting topping data failed. Error:${error.message}`);
        res
          .status(500)
          .send({ message: "トッピング情報の削除に失敗しました。" });
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
