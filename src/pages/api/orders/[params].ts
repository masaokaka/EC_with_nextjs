import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Order from "../../../models/order";
import connectDB from "../../../config/mongoDB";
import { OrderType } from "../../../features/order/ordersSlice";
import { CartType, CartItemType } from "../../../features/cart/cartSlice";

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
  //POSTメソッドでのアクセスを処理
  if (method === "POST") {
    if (params === "fetch-cart") {
      try {
        const uid: string = req.body.uid;
        const user_cart: CartType = await Order.findOne({
          uid: uid,
          status: 0,
        });
        console.log("fetching users cart data success");
        res.status(200).send(user_cart);
      } catch (error) {
        console.log(`fetching users cart data failed. Error:${error.message}`);
        res.status(500).send({ message: "カート情報の取得に失敗しました。" });
      }
    } else if (params === "update-cart") {
      try {
        const new_itemInfo: CartItemType = req.body.itemInfo;
        const uid: string = req.body.uid;
        const updated_cart: OrderType = await Order.findOneAndUpdate(
          { uid: uid, status: 0 },
          { itemInfo: new_itemInfo },
          { new: true }
        );
        console.log("updating users cart data success");
        res.status(200).send(updated_cart);
      } catch (error) {
        console.log(`updating users cart data failed. Error:${error.message}`);
        res.status(500).send({ message: "カート情報の更新に失敗しました。" });
      }
    } else if (params === "create-cart") {
      try {
        const new_cart: CartType = {
          ...req.body.cart,
          _id: mongoose.Types.ObjectId(),
        };
        const newOrder = new Order(new_cart);
        const created_cart: CartType = await newOrder.save();
        console.log("updating users cart data success");
        res.status(200).send(created_cart);
      } catch (error) {
        console.log(`updating users cart data failed. Error:${error.message}`);
        res.status(500).send({ message: "カート情報の更新に失敗しました。" });
      }
    } else if (params === "update-order") {
      try {
        const order: OrderType = req.body.order;
        const updated_order: OrderType = await Order.findOneAndUpdate(
          { _id: order._id },
          order,
          { new: true }
        );
        console.log("updating users orderhistory data success");
        res.status(200).send(updated_order);
      } catch (error) {
        console.log(
          `updating users orderhistory data failed. Error:${error.message}`
        );
        res.status(500).send({ message: "注文情報の更新に失敗しました。" });
      }
    } else if (params === "update-status") {
      try {
        const _id: string = req.body._id;
        const status: number = req.body.status;
        const updated_order: OrderType = await Order.findOneAndUpdate(
          { _id: _id },
          { status: status },
          { new: true }
        );
        console.log("updating users order status success");
        res.status(200).send(updated_order);
      } catch (error) {
        console.log(
          `updating users order status failed. Error:${error.message}`
        );
        res
          .status(500)
          .send({ message: "注文ステータスの更新に失敗しました。" });
      }
    } else if (params === "fetch-all-orders-of-user") {
      try {
        const uid: string = req.body.uid;
        const all_orders_of_user: OrderType[] = await Order.find({
          uid: uid,
          status: { $ne: 0 },
        });
        console.log("fetching users orderhistory data success");
        res.status(200).send(all_orders_of_user);
      } catch (error) {
        console.log(
          `fetching users orderhistory data failed. Error:${error.message}`
        );
        res.status(500).send({ message: "注文履歴情報の取得に失敗しました。" });
      }
    }
  }
}

export default handler;
