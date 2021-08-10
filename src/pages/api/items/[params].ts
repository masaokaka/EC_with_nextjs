import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { generateUploadUrl } from "../../../config/aws_s3"; //s3.jsファイルの読み込み
import Item from "../../../models/item";
// import { connectDB, disconnectDB } from "../../../helpers/db_utils";
import connectDB from "../../../config/mongoDB";
import { ItemType } from "../../../features/item/itemsSlice";

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

  //GETメソッドでのアクセスを処理
  if (method === "GET") {
    if (params === "fetch-all") {
      try {
        const items = await Item.find({});
        console.log("fetching items data success");
        res.status(200).send(items);
      } catch (error) {
        console.log(`fetching items data failed. Error:${error.message}`);
        res.status(500).send({ message: "商品情報の取得に失敗しました。" });
      }
    } else if (params === "get-s3-url") {
      try {
        const url: string = await generateUploadUrl();
        res.status(200).send({ url });
      } catch (error) {
        console.log(`fetching AWS S3 URL failed. Error:${error.message}`);
        res.status(500).send({ message: "商品情報の追加に失敗しました。" });
      }
    }
  }
  //POSTメソッドでのアクセスを処理
  if (method === "POST") {
    if (params === "add") {
      try {
        const new_item: ItemType = {
          ...req.body,
          _id: mongoose.Types.ObjectId(),
        };
        const newItem = new Item(new_item);
        const response_item: ItemType = await newItem.save();
        console.log("saving item data success");
        res.status(200).send(response_item);
      } catch (error) {
        console.log(`saving item data failed. Error:${error.message}`);
        res.status(500).send({ message: "商品情報の追加に失敗しました。" });
      }
    } else if (params === "delete") {
      try {
        const _id: string = req.body._id;
        await Item.findByIdAndDelete(_id);
        console.log("deleting item data success");
        res.status(200).end();
      } catch (error) {
        console.log(`deleting topping data failed. Error:${error.message}`);
        res
          .status(500)
          .send({ message: "トッピング情報の削除に失敗しました。" });
      }
    }
  }
}

export default handler;
