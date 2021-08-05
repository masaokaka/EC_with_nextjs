import { auth, sessionPersistance } from "../../config/firebase";
import { UserInfoType } from "./userinfoSlice";
import { UserCredential } from "../../config/firebase";
import axios, { AxiosResponse, AxiosError } from "axios";
import { USERINFOS_COLLECTION_PATH } from "../../config/mongoDB/config";
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
            reject(e.message);
          });
      })
      .catch((e) => {
        reject(e.message);
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
    .post(`/api${USERINFOS_COLLECTION_PATH}/get`, { uid })
    .then((res: AxiosResponse<UserInfoType>) => {
      return res.data;
    })
    .catch((e: AxiosError<{ message: string }>) => {
      if (e.response) {
        throw new Error(e.response.data.message);
      } else {
        throw new Error(e.message);
      }
    });

//ユーザー情報登録
export const add_userinfo_to_db = (
  userinfo: UserInfoType
): Promise<UserInfoType> =>
  axios
    .post(`/api${USERINFOS_COLLECTION_PATH}/add`, userinfo)
    .then((res: AxiosResponse<UserInfoType>) => {
      return res.data;
    })
    .catch((e: AxiosError<{ message: string }>) => {
      if (e.response) {
        throw new Error(e.response.data.message);
      } else {
        throw new Error(e.message);
      }
    });
