import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  login_to_firebase,
  get_userinfo_from_db,
  add_userinfo_to_db,
  register_to_firebase,
} from "./userinfoAPI";

interface ThunkConfig {
  state: RootState;
  rejectValue: {
    errorMsg: string;
  };
}

export interface UserInfoType {
  _id?: string;
  uid?: string;
  name: string;
  address: string;
  email: string;
  tel: string;
  username: string;
  zipcode: string;
}

interface UserState {
  value: UserInfoType | null;
  status: "idle" | "loading" | "failed";
  errorMsg: string | null;
}

const initialState: UserState = {
  value: null,
  status: "idle",
  errorMsg: null,
};

//ログイン
export const loginAsync = createAsyncThunk<
  undefined,
  { email: string; password: string },
  ThunkConfig
>("userinfo/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    await login_to_firebase(email, password);
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
});

//ユーザー情報登録
export const registerAsync = createAsyncThunk<
  UserInfoType,
  { password: string; userinfo: UserInfoType },
  ThunkConfig
>("userinfo/register", async ({ password, userinfo }, { rejectWithValue }) => {
  try {
    const uid = await register_to_firebase(userinfo.email, password);
    const userinfo_with_uid = {
      ...userinfo,
      uid: uid,
    };
    const new_userinfo = await add_userinfo_to_db(userinfo_with_uid);
    return new_userinfo;
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
});

//ユーザー情報取得
export const getUserinfoAsync = createAsyncThunk<
  UserInfoType,
  { uid: string },
  ThunkConfig
>("user/fetchUserData", async ({ uid }, { rejectWithValue }) => {
  try {
    const userinfo = await get_userinfo_from_db(uid);
    return userinfo;
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
});

//スライス
export const userinfoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    unsetUser: () => {
      return initialState;
    },
    unsetUserError: (state) => {
      state.status = "idle";
      state.errorMsg = null;
      return state;
    },
  },
  extraReducers: (builder) => {
    //ログイン
    builder.addCase(loginAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginAsync.fulfilled, (state) => {
      state.status = "idle";
      state.errorMsg = null;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload) {
        state.errorMsg = action.payload.errorMsg;
      }
    });
    //新規登録
    builder.addCase(registerAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = action.payload;
      state.errorMsg = null;
    });
    builder.addCase(registerAsync.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload) {
        state.errorMsg = action.payload.errorMsg;
      }
    });
    //ユーザー情報取得処理
    builder.addCase(getUserinfoAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUserinfoAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = action.payload;
      state.errorMsg = null;
    });
    builder.addCase(getUserinfoAsync.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload) {
        console.log(action.payload.errorMsg);
        state.errorMsg = action.payload.errorMsg;
      }
    });
  },
});

export const { unsetUser, unsetUserError } = userinfoSlice.actions;
export const selectUserInfo = (state: RootState) => state.userinfo.value;
export const selectUid = (state: RootState) => state.userinfo.value?.uid;
export const selectUserInfoStatus = (state: RootState) => state.userinfo.status;
export const selectUserInfoErrorMsg = (state: RootState) =>
  state.userinfo.errorMsg;

export default userinfoSlice.reducer;
