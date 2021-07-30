import { ItemType } from "./itemsSlice";
import { ITEMS_COLLECTION_PATH } from "../../../config/mongoDB/config";
import axios, { AxiosError, AxiosResponse } from "axios";

//アイテムの取得
export const fetch_all_items = (): Promise<ItemType[]> =>
  axios
    .get<ItemType[]>(`/api${ITEMS_COLLECTION_PATH}/fetch-all`)
    .then((res: AxiosResponse<ItemType[]>) => {
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

//AWSからS3への画像ファイルアップロードに必要なURLを取得する処理
export const get_temporaryUrl_from_aws_s3 = (): Promise<string> =>
  axios
    .get(`/api${ITEMS_COLLECTION_PATH}/get-s3-url`)
    .then((res: AxiosResponse<{ url: string }>) => {
      return res.data.url;
    })
    .catch((e: AxiosError<{ message: string }>) => {
      if (e.response) {
        throw new Error(e.response.data.message);
      } else {
        throw new Error(e.message);
      }
    });

export const save_img_to_aws_s3 = (url: string, img: File): Promise<void> =>
  axios
    .put(url, img)
    .then((res: AxiosResponse) => {
      console.log(res.data);
      return;
    })
    .catch((e: AxiosError<string>) => {
      throw new Error(e.message);
    });

export const add_item_to_db = (item: ItemType): Promise<ItemType> =>
  axios
    .post(`/api${ITEMS_COLLECTION_PATH}/add`, item)
    .then((res: AxiosResponse<ItemType>) => {
      return res.data;
    })
    .catch((e: AxiosError<{ message: string }>) => {
      if (e.response) {
        throw new Error(e.response.data.message);
      } else {
        throw new Error(e.message);
      }
    });

//商品削除
export const delete_item_from_db = (_id: string): Promise<void> =>
  axios
    .post(`/api${ITEMS_COLLECTION_PATH}/delete`, { _id })
    .then((res: AxiosResponse<any>) => {
      console.log(res.data.deletedItem);
      return;
    })
    .catch((e: AxiosError<{ message: string }>) => {
      if (e.response) {
        throw new Error(e.response.data.message);
      } else {
        throw new Error(e.message);
      }
    });
