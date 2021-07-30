import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Order from "../../../models/topping";
// import { connectDB, disconnectDB } from "../../../helpers/db_utils";
import connectDB from "../../../config/mongoDB";
import { OrderType } from "../../../store/features/order/ordersSlice";

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
      //   try {
      //     const toppings = await Topping.find({});
      //     console.log("fetching toppings data success");
      //     res.status(200).send(toppings);
      //   } catch (error) {
      //     console.log(`fetching toppings data failed. Error:${error.message}`);
      //     res
      //       .status(500)
      //       .send({ message: "トッピング情報の取得に失敗しました。" });
      //   }
    }
  }
  //POSTメソッドでのアクセスを処理
  if (method === "POST") {
    if (params === "add") {
      //   try {
      //     const new_topping: ToppingType = {
      //       ...req.body,
      //       _id: mongoose.Types.ObjectId(),
      //     };
      //     const newTopping = new Topping(new_topping);
      //     const response_topping: ToppingType = await newTopping.save();
      //     console.log("saving topping data success");
      //     res.status(200).send(response_topping);
      //   } catch (error) {
      //     console.log(`saving topping data failed. Error:${error.message}`);
      //     res
      //       .status(500)
      //       .send({ message: "トッピング情報の追加に失敗しました。" });
      //   }
    } else if (params === "delete") {
      //   try {
      //     const _id: string = req.body._id;
      //     await Topping.findByIdAndDelete(_id);
      //     res.status(200).end();
      //   } catch (error) {
      //     console.log(`deleting topping data failed. Error:${error.message}`);
      //     res
      //       .status(500)
      //       .send({ message: "トッピング情報の削除に失敗しました。" });
      //   }
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

// import type { NextApiRequest, NextApiResponse } from "next";
// var express = require("express");
// var router = express.Router();
// const Order = require("../models/order.js");
// const mongoose = require("mongoose");

// //カート系処理-----------------------------------
// //カート内商品取得処理
// router.post("/fetch-cart", (req: NextApiRequest, res: NextApiResponse) => {
//   const uid = req.body.uid;
//   Order.findOne({ uid: uid, status: 0 }).then((cart) => {
//     console.log(cart);
//     res.send(cart);
//   });
// });

// //カート内商品の更新処理(追加、削除)
// router.post(
//   "/update-item-of-cart",
//   (req: NextApiRequest, res: NextApiResponse) => {
//     const new_itemInfo = req.body.itemInfo;
//     console.log(new_itemInfo);
//     const uid = req.body.uid;
//     Order.findOneAndUpdate(
//       { uid: uid, status: 0 },
//       { itemInfo: new_itemInfo },
//       { new: true }
//     ).then((cart) => {
//       console.log(cart);
//       res.send(cart);
//     });
//   }
// );

// //新しいカート作成処理
// router.post("/create-cart", (req: NextApiRequest, res: NextApiResponse) => {
//   console.log(req.body.cart);
//   const new_cart = {
//     ...req.body.cart,
//     _id: mongoose.Types.ObjectId(),
//   };
//   const newOrder = new Order(new_cart);
//   newOrder.save().then((cart) => {
//     console.log(cart);
//     res.send(cart);
//   });
// });

// //注文履歴系処理-----------------------------------
// //ユーザーの注文済みオーダー取得処理
// router.post(
//   "/fetch-all-orders-of-user",
//   (req: NextApiRequest, res: NextApiResponse) => {
//     const uid = req.body.uid;
//     //「$ne」は指定の値に一致しないもの
//     Order.find({ uid: uid, status: { $ne: 0 } }).then((orders) => {
//       console.log(orders);
//       res.send(orders);
//     });
//   }
// );

// //オーダー更新処理(注文確定)
// router.post(
//   "/update-order-all",
//   (req: NextApiRequest, res: NextApiResponse) => {
//     const order = req.body.order;
//     console.log(order);
//     Order.findOneAndUpdate({ _id: order._id }, order, { new: true }).then(
//       (new_order) => {
//         console.log(new_order);
//         res.send(new_order);
//       }
//     );
//   }
// );

// //オーダーステータス更新処理
// router.post(
//   "/update-order-status",
//   (req: NextApiRequest, res: NextApiResponse) => {
//     const _id = req.body._id;
//     const status = req.body.status;
//     Order.findOneAndUpdate(
//       { _id: _id },
//       { status: status },
//       { new: true }
//     ).then((new_order) => {
//       console.log(new_order);
//       res.send(new_order);
//     });
//   }
// );

// module.exports = router;