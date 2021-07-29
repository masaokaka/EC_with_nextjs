import { ToppingType } from "./toppingsSlice";
import { TOPPINGS_COLLECTION_PATH } from "../../../config/mongoDB";
import axios, { AxiosResponse, AxiosError } from "axios";

//トッピングの取得
export const fetch_all_toppings = (): Promise<ToppingType[]> =>
  axios
    .get(`/api${TOPPINGS_COLLECTION_PATH}/fetch-all`)
    .then((res: AxiosResponse<ToppingType[]>) => {
      console.log(res.data);
      return res.data;
    })
    .catch((e: AxiosError<{ message: string }>) => {
      if (e.response) {
        throw new Error(e.response.data.message);
      } else {
        throw new Error(e.message);
      }
    });

//トッピング追加
export const add_topping_to_db = (topping: ToppingType): Promise<ToppingType> =>
  axios
    .post(`/api${TOPPINGS_COLLECTION_PATH}/add-topping`, topping)
    .then((res: AxiosResponse<ToppingType>) => {
      return res.data;
    })
    .catch((e) => {
      throw new Error(e);
    });

//トッピング削除
export const delete_topping_from_db = (_id: string): Promise<any> =>
  axios
    .post(`/api${TOPPINGS_COLLECTION_PATH}/delete-topping`, { _id })
    .then((res: AxiosResponse<any>) => {
      console.log(res.data.deletedTopping);
      return;
    })
    .catch((e) => {
      throw new Error(e);
    });
