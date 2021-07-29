import type { NextApiRequest, NextApiResponse } from "next";
var express = require("express");
var router = express.Router();
const Order = require("../models/order.js");
const mongoose = require("mongoose");

//カート系処理-----------------------------------
//カート内商品取得処理
router.post("/fetch-cart", (req: NextApiRequest, res: NextApiResponse) => {
  const uid = req.body.uid;
  Order.findOne({ uid: uid, status: 0 }).then((cart) => {
    console.log(cart);
    res.send(cart);
  });
});

//カート内商品の更新処理(追加、削除)
router.post(
  "/update-item-of-cart",
  (req: NextApiRequest, res: NextApiResponse) => {
    const new_itemInfo = req.body.itemInfo;
    console.log(new_itemInfo);
    const uid = req.body.uid;
    Order.findOneAndUpdate(
      { uid: uid, status: 0 },
      { itemInfo: new_itemInfo },
      { new: true }
    ).then((cart) => {
      console.log(cart);
      res.send(cart);
    });
  }
);

//新しいカート作成処理
router.post("/create-cart", (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body.cart);
  const new_cart = {
    ...req.body.cart,
    _id: mongoose.Types.ObjectId(),
  };
  const newOrder = new Order(new_cart);
  newOrder.save().then((cart) => {
    console.log(cart);
    res.send(cart);
  });
});

//注文履歴系処理-----------------------------------
//ユーザーの注文済みオーダー取得処理
router.post(
  "/fetch-all-orders-of-user",
  (req: NextApiRequest, res: NextApiResponse) => {
    const uid = req.body.uid;
    //「$ne」は指定の値に一致しないもの
    Order.find({ uid: uid, status: { $ne: 0 } }).then((orders) => {
      console.log(orders);
      res.send(orders);
    });
  }
);

//オーダー更新処理(注文確定)
router.post(
  "/update-order-all",
  (req: NextApiRequest, res: NextApiResponse) => {
    const order = req.body.order;
    console.log(order);
    Order.findOneAndUpdate({ _id: order._id }, order, { new: true }).then(
      (new_order) => {
        console.log(new_order);
        res.send(new_order);
      }
    );
  }
);

//オーダーステータス更新処理
router.post(
  "/update-order-status",
  (req: NextApiRequest, res: NextApiResponse) => {
    const _id = req.body._id;
    const status = req.body.status;
    Order.findOneAndUpdate(
      { _id: _id },
      { status: status },
      { new: true }
    ).then((new_order) => {
      console.log(new_order);
      res.send(new_order);
    });
  }
);

module.exports = router;
