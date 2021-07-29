import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { generateUploadUrl } from "../../../config/aws_s3"; //s3.jsファイルの読み込み
import Item from "../../../models/item";
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

  //GETメソッドでのアクセスを処理
  if (method === "GET") {
    if (params === "fetch-all") {
      try {
        const items = await Item.find({});
        console.log("fetching items data success");
        res.status(201).send(items);
      } catch (error) {
        console.log(`fetching items data failed. Error:${error.message}`);
        res.status(500).send({ message: "商品情報の取得に失敗しました。" });
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

  // mongoose.connection
  //   .close()
  //   .then(() => console.log("db disconnection success"))
  //   .catch((error) =>
  //     console.log(`db connection failed. Error:${error.message}`)
  //   );
}
// //商品取得処理
// router.get("/fetch-all-items", (req: NextApiRequest, res:NextApiResponse) => {
//   Item.find({}).then((items) => {
//     console.log(items);
//     res.send(items);
//   });
// });

// //画像ファイル登録用の一時的なURLをAWS S3から取得
// router.get("/get-s3-url", async (req: NextApiRequest, res: NextApiResponse) => {
//   const url = await generateUploadUrl();
//   res.send({ url });
// });
// //商品追加処理
// router.post("/add-item", (req: NextApiRequest, res: NextApiResponse) => {
//   console.log(req.body);
//   const new_item = {
//     ...req.body,
//     _id: mongoose.Types.ObjectId(),
//   };
//   const newItem = new Item(new_item);
//   newItem.save().then((item) => {
//     console.log(item);
//     res.send(item);
//   });
// });

// //商品削除処理
// router.post("/delete-item", (req: NextApiRequest, res: NextApiResponse) => {
//   console.log(req.body._id);
//   const _id = req.body._id;
//   Item.findByIdAndDelete(_id).then((deletedItem) => {
//     res.send({ deletedItem });
//   });
// });

export default handler;
