import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Topping from "../../../models/topping";
import { connectDB, disconnectDB } from "../../../helpers/db_utils";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params: string | string[] = req.query.params;
  const method: string = req.method!;

  //DBへの接続確認
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
        res.status(201).send(toppings);
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
  }

  //全ての処理が抜けた後、disconnectする※重要※
  try {
    disconnectDB();
  } catch (error) {
    res.status(500).send({ message: "データベースの切断に失敗しました。" });
  }
}

export default handler;
