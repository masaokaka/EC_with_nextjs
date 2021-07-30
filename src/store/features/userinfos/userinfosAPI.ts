import axios, { AxiosResponse, AxiosError } from "axios";
import { USERINFOS_COLLECTION_PATH } from "../../../config/mongoDB/config";
import { UserInfoType } from "../userinfo/userinfoSlice";

//ユーザー情報取得
export const get_all_userinfo_from_db = (): Promise<UserInfoType[]> =>
  axios
    .get(`/api${USERINFOS_COLLECTION_PATH}/get-all`)
    .then((res: AxiosResponse<UserInfoType[]>) => {
      return res.data;
    })
    .catch((e: AxiosError<{ message: string }>) => {
      if (e.response) {
        throw new Error(e.response.data.message);
      } else {
        throw new Error(e.message);
      }
    });
