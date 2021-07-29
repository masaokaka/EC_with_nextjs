import { CartItemType, CartType } from "./cartSlice";
import axios from "axios";
import { API_PATH, ORDERS_COLLECTION_PATH } from "../../../config/mongoDB";

//カートの商品を更新(追加、削除)
export const update_item_of_cart = (
  itemInfo: CartItemType[],
  uid: string
): Promise<CartType> =>
  axios
    .post(`${API_PATH + ORDERS_COLLECTION_PATH}/update-item-of-cart`, {
      itemInfo,
      uid,
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw new Error(e);
    });

//カートの新規作成
export const create_cart = (cart: CartType): Promise<CartType> =>
  axios
    .post(`${API_PATH + ORDERS_COLLECTION_PATH}/create-cart`, { cart })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw new Error(e);
    });

//カートの取得
export const fetch_cart = (uid: string): Promise<CartType> =>
  axios
    .post(`${API_PATH + ORDERS_COLLECTION_PATH}/fetch-cart`, { uid })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw new Error(e);
    });
