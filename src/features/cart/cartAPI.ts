import { CartItemType, CartType } from "./cartSlice";
import axios, { AxiosResponse, AxiosError } from "axios";
import { ORDERS_COLLECTION_PATH } from "../../config/mongoDB/config";

//カートの商品を更新(追加、削除)
export const update_item_of_cart = (
  itemInfo: CartItemType[],
  uid: string
): Promise<CartType> =>
  axios
    .post(`/api${ORDERS_COLLECTION_PATH}/update-cart`, {
      itemInfo,
      uid,
    })
    .then((res: AxiosResponse<CartType>) => {
      return res.data;
    })
    .catch((e: AxiosError<{ message: string }>) => {
      if (e.response) {
        console.log(e.response.data.message);
        throw new Error(e.response.data.message);
      } else {
        console.log(e.message);
        throw new Error(e.message);
      }
    });

//カートの新規作成
export const create_cart = (cart: CartType): Promise<CartType> =>
  axios
    .post(`/api${ORDERS_COLLECTION_PATH}/create-cart`, { cart })
    .then((res: AxiosResponse<CartType>) => {
      return res.data;
    })
    .catch((e: AxiosError<{ message: string }>) => {
      if (e.response) {
        console.log(e.response.data.message);
        throw new Error(e.response.data.message);
      } else {
        console.log(e.message);
        throw new Error(e.message);
      }
    });

//カートの取得
export const fetch_cart = (uid: string): Promise<CartType> =>
  axios
    .post(`/api${ORDERS_COLLECTION_PATH}/fetch-cart`, { uid })
    .then((res: AxiosResponse<CartType>) => {
      return res.data;
    })
    .catch((e: AxiosError<{ message: string }>) => {
      if (e.response) {
        console.log(e.response.data.message);
        throw new Error(e.response.data.message);
      } else {
        console.log(e.message);
        throw new Error(e.message);
      }
    });
