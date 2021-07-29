import { auth, sessionPersistance } from "../../../config/firebase";
import { UserInfoType } from "./userinfoSlice";
import { UserCredential } from "../../../config/firebase";
import axios, { AxiosResponse } from "axios";
import { API_PATH, USERINFOS_COLLECTION_PATH } from "../../../config/mongoDB";
// //ログイン
export const login_to_firebase = (
  email: string,
  password: string
): Promise<string> => {
  return new Promise((resolve, reject) =>
    auth
      .setPersistence(sessionPersistance)
      .then(async () => {
        await auth
          .signInWithEmailAndPassword(email, password)
          .then((user: UserCredential) => {
            if (user.user !== null) {
              resolve(user.user.uid);
            } else {
              reject("ユーザー情報が取得できませんでした");
            }
          })
          .catch((e) => {
            reject(e);
          });
      })
      .catch((e) => {
        reject(e);
      })
  );
};

//新規登録
export const register_to_firebase = (
  email: string,
  password: string
): Promise<string> => {
  return new Promise((resolve, reject) =>
    auth
      .setPersistence(sessionPersistance)
      .then(async () => {
        await auth
          .createUserWithEmailAndPassword(email, password)
          .then((user: UserCredential) => {
            if (user.user !== null) {
              resolve(user.user.uid);
            } else {
              reject("ユーザー情報が登録できませんでした");
            }
          })
          .catch((e) => {
            reject(e);
          });
      })
      .catch((e) => {
        reject(e);
      })
  );
};

//ログアウト
export const logout_from_firebase = () => {
  auth.signOut().catch((e) => {
    alert(e.message);
  });
};

//ユーザー情報取得
export const get_userinfo_from_db = (uid: string): Promise<UserInfoType> =>
  axios
    .post(`${API_PATH + USERINFOS_COLLECTION_PATH}/get-userinfo`, { uid })
    .then((res: AxiosResponse<UserInfoType>) => {
      return res.data;
    })
    .catch((e) => {
      throw new Error(e);
    });

//ユーザー情報登録
export const add_userinfo_to_db = (
  userinfo: UserInfoType
): Promise<UserInfoType> =>
  axios
    .post(`${API_PATH + USERINFOS_COLLECTION_PATH}/add-userinfo`, userinfo)
    .then((res: AxiosResponse<UserInfoType>) => {
      return res.data;
    })
    .catch((e) => {
      throw new Error(e);
    });
