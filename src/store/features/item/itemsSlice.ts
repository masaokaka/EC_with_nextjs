import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  add_item_to_db,
  delete_item_from_db,
  fetch_all_items,
  get_temporaryUrl_from_aws_s3,
  save_img_to_aws_s3,
} from "./itemsAPI";

interface ThunkConfig {
  state: RootState;
  rejectValue: {
    errorMsg: string;
  };
}

export interface ItemType {
  _id?: string;
  name?: string;
  text?: string;
  mprice?: number;
  lprice?: number;
  img?: string;
}

interface ItemsState {
  value: ItemType[];
  status: "idle" | "loading" | "failed";
  errorMsg: string | null;
}

const initialState: ItemsState = {
  value: [],
  status: "idle",
  errorMsg: null,
};

//商品全件取得
export const fetchAllItemsAsync = createAsyncThunk<
  ItemType[],
  undefined,
  ThunkConfig
>("items/fetch", async (_, { rejectWithValue }) => {
  try {
    const items = await fetch_all_items();
    return items;
  } catch (error) {
    return rejectWithValue({ errorMsg: error });
  }
});

//商品追加
export const addItemAsync = createAsyncThunk<
  ItemType,
  { item: ItemType; img: File },
  ThunkConfig
>("items/add", async ({ item, img }, { rejectWithValue }) => {
  try {
    //①　AWSからurlをとってくる処理
    const url: string = await get_temporaryUrl_from_aws_s3();
    //②　とってきた後、画像をS3に配置する処理
    await save_img_to_aws_s3(url, img);
    //③　取得したurlから画像データにアクセスするために必要なurlを切り出す
    const imageUrl = url.split("?")[0];
    //④　配置先のURLを取得して、それと他のデータをmongoDBへ保存する処理
    item.img = imageUrl;
    const new_item = await add_item_to_db(item);
    return new_item;
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
});

//商品削除
export const deleteItemAsync = createAsyncThunk<
  string,
  { _id: string },
  ThunkConfig
>("toppings/delete", async ({ _id }, { rejectWithValue }) => {
  try {
    await delete_item_from_db(_id);
    return _id;
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
});

export const ItemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    unsetItems: (state) => {
      return (state = initialState);
    },
    unsetItemsError: (state) => {
      state.status = "idle";
      state.errorMsg = null;
      return state;
    },
  },
  extraReducers: (builder) => {
    //商品全件取得
    builder.addCase(fetchAllItemsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllItemsAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = action.payload;
      state.errorMsg = null;
    });
    builder.addCase(fetchAllItemsAsync.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload) {
        state.errorMsg = action.payload.errorMsg;
      }
    });
    //商品追加
    builder.addCase(addItemAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addItemAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = [...state.value, action.payload];
      state.errorMsg = null;
    });
    builder.addCase(addItemAsync.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload) {
        state.errorMsg = action.payload.errorMsg;
      }
    });
    //商品削除
    builder.addCase(deleteItemAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteItemAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = state.value.filter(
        (topping) => topping._id !== action.payload
      );
      state.errorMsg = null;
    });
    builder.addCase(deleteItemAsync.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload) {
        state.errorMsg = action.payload.errorMsg;
      }
    });
  },
});

export const { unsetItems, unsetItemsError } = ItemsSlice.actions;
export const selectItems = (state: RootState) => state.items.value;
export const selectItemsStatus = (state: RootState) => state.items.status;
export const selectItemsErrorMsg = (state: RootState) => state.items.errorMsg;

export default ItemsSlice.reducer;
