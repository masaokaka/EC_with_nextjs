import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { update_item_of_cart, fetch_cart, create_cart } from "./cartAPI";

interface ThunkConfig {
  state: RootState;
  rejectValue: {
    errorMsg: string;
  };
}

export interface CartTopType {
  toppingId: string;
  size: number;
}

export interface CartItemType {
  id: string;
  itemId: string;
  itemNum: number;
  itemSize: number;
  toppings: CartTopType[];
}

export interface CartType {
  _id?: string;
  uid?: string;
  itemInfo?: CartItemType[];
  status?: number;
}

interface CartState {
  value: CartType;
  status: "idle" | "loading" | "failed";
  errorMsg: string | null;
}

const initialState: CartState = {
  value: {},
  status: "idle",
  errorMsg: null,
};

//カートのアイテム取得
export const fetchCartAsync = createAsyncThunk<
  CartType,
  { uid: string },
  ThunkConfig
>("cart/fetch", async ({ uid }, { rejectWithValue }) => {
  try {
    const cart = await fetch_cart(uid);
    return cart;
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
});

//カートへアイテム追加
export const addItemToCartAsync = createAsyncThunk<
  CartType,
  { itemInfo: CartItemType[]; uid: string },
  ThunkConfig
>("cart/add", async ({ itemInfo, uid }, { rejectWithValue }) => {
  try {
    const cart = await update_item_of_cart(itemInfo, uid);
    return cart;
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
});

//カートからアイテム削除
export const deleteItemFromCartAsync = createAsyncThunk<
  CartType,
  { itemInfo: CartItemType[]; uid: string },
  ThunkConfig
>("cart/add", async ({ itemInfo, uid }, { rejectWithValue }) => {
  try {
    const cart = await update_item_of_cart(itemInfo, uid);
    return cart;
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
});

//カートの新規作成
export const createCartAsync = createAsyncThunk<
  CartType,
  { cart: CartType },
  ThunkConfig
>("cart/create", async ({ cart }, { rejectWithValue }) => {
  try {
    const new_cart = await create_cart(cart);
    return new_cart;
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    unsetCart: () => {
      return initialState;
    },
    setCart: (state, action) => {
      state.value = action.payload;
      return state;
    },
    unsetCartError: (state) => {
      state.status = "idle";
      state.errorMsg = null;
      return state;
    },
  },
  extraReducers: (builder) => {
    //カート取得
    builder.addCase(fetchCartAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = action.payload;
      state.errorMsg = null;
    });
    builder.addCase(fetchCartAsync.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload) {
        state.errorMsg = action.payload.errorMsg;
      }
    });
    //カートへ商品を追加
    builder.addCase(addItemToCartAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addItemToCartAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = action.payload;
      state.errorMsg = null;
    });
    builder.addCase(addItemToCartAsync.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload) {
        state.errorMsg = action.payload.errorMsg;
      }
    });
    //カートを新規作成
    builder.addCase(createCartAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createCartAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = action.payload;
      state.errorMsg = null;
    });
    builder.addCase(createCartAsync.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload) {
        state.errorMsg = action.payload.errorMsg;
      }
    });
  },
});

export const { setCart, unsetCart, unsetCartError } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart.value;
export const selectCartStatus = (state: RootState) => state.cart.status;
export const selectCartErrorMsg = (state: RootState) => state.cart.errorMsg;

export default cartSlice.reducer;
