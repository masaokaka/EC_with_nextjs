import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { UserInfoType } from "../userinfo/userinfoSlice";
import { get_all_userinfo_from_db } from "./userinfosAPI";

interface ThunkConfig {
  state: RootState;
  rejectValue: {
    errorMsg: string;
  };
}
export interface UsersState {
  value: UserInfoType[];
  status: "idle" | "loading" | "failed";
  errorMsg: string | null;
}
const initialState: UsersState = {
  value: [],
  status: "idle",
  errorMsg: null,
};

//ユーザー情報取得
export const getAllUsersAsync = createAsyncThunk<
  UserInfoType[],
  undefined,
  ThunkConfig
>("users/getallusers", async (_, { rejectWithValue }) => {
  try {
    const userinfos = await get_all_userinfo_from_db();
    return userinfos;
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
});

export const userinfosSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    unsetUserInfos: () => {
      return initialState;
    },
    unsetUserInfosError: (state) => {
      state.status = "idle";
      state.errorMsg = null;
      return state;
    },
  },
  extraReducers: (builder) => {
    //全ユーザ取得
    builder.addCase(getAllUsersAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAllUsersAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = action.payload;
      state.errorMsg = null;
    });
    builder.addCase(getAllUsersAsync.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload) {
        state.errorMsg = action.payload.errorMsg;
      }
    });
  },
});

export const { unsetUserInfos, unsetUserInfosError } = userinfosSlice.actions;
export const selectUserInfos = (state: RootState) => state.userinfos.value;
export const selectUserInfosStatus = (state: RootState) =>
  state.userinfos.status;
export const selectUserInfosErrorMsg = (state: RootState) =>
  state.userinfos.errorMsg;

export default userinfosSlice.reducer;
