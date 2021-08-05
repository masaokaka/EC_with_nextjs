import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CartType, unsetCart } from "../cart/cartSlice";
import {
  fetch_all_orders_of_user,
  update_order,
  update_order_status,
} from "./ordersAPI";

interface ThunkConfig {
  state: RootState;
  rejectValue: {
    errorMsg: string;
  };
}

export interface OrderInfoType {
  name?: string;
  email?: string;
  zipcode?: string;
  address?: string;
  tel?: string;
  status?: number;
  orderDatetime?: string;
  payType?: number;
  cardNo?: string;
  timestamp?: number;
  totalPrice?: number;
}
//カートの型と注文情報の型を継承
export interface OrderType extends CartType, OrderInfoType {}

interface OrderState {
  value: OrderType[];
  status: "idle" | "loading" | "failed";
  errorMsg: string | null;
}

const initialState: OrderState = {
  value: [],
  status: "idle",
  errorMsg: null,
};

//ユーザーの注文履歴全件取得処理
export const fetchOrdersAsync = createAsyncThunk<
  OrderType[],
  { uid: string },
  ThunkConfig
>("orders/fetch", async ({ uid }, { rejectWithValue }) => {
  try {
    const new_orders = await fetch_all_orders_of_user(uid);
    return new_orders;
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
});

//オーダー処理(カートにオーダー情報加えたものに更新)
export const orderAsync = createAsyncThunk<
  OrderType,
  { order: OrderType },
  ThunkConfig
>("orders/order", async ({ order }, { rejectWithValue, dispatch }) => {
  try {
    const new_order = await update_order(order);
    dispatch(unsetCart());
    return new_order;
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
});

//オーダーステータス更新処理
export const updateOrderStatusAsync = createAsyncThunk<
  OrderType,
  { status: number; _id: string },
  ThunkConfig
>("orders/updateStatus", async ({ status, _id }, { rejectWithValue }) => {
  try {
    const new_order = await update_order_status(status, _id);
    return new_order;
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
});

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    unsetOrders: (state) => {
      return (state = initialState);
    },
    unsetOrdersError: (state) => {
      state.status = "idle";
      state.errorMsg = null;
      return state;
    },
  },
  extraReducers: (builder) => {
    //ユーザの履歴全件取得
    builder.addCase(fetchOrdersAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = action.payload;
      state.errorMsg = null;
    });
    builder.addCase(fetchOrdersAsync.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload) {
        state.errorMsg = action.payload.errorMsg;
      }
    });
    //注文処理
    builder.addCase(orderAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(orderAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = [...state.value, action.payload];
      state.errorMsg = null;
    });
    builder.addCase(orderAsync.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload) {
        state.errorMsg = action.payload.errorMsg;
      }
    });
    //ステータス更新処理
    builder.addCase(updateOrderStatusAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateOrderStatusAsync.fulfilled, (state, action) => {
      state.status = "idle";
      let new_value = state.value.map((val) => {
        if (val._id === action.payload._id) {
          return action.payload;
        } else {
          return val;
        }
      });
      state.value = new_value;
      state.errorMsg = null;
    });
    builder.addCase(updateOrderStatusAsync.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload) {
        state.errorMsg = action.payload.errorMsg;
      }
    });
  },
});

export const { unsetOrders, unsetOrdersError } = ordersSlice.actions;
export const selectOrders = (state: RootState): OrderType[] =>
  state.orders.value;
export const selectOrdersStatus = (state: RootState) => state.orders.status;
export const selectOrdersErrorMsg = (state: RootState) => state.orders.errorMsg;

export default ordersSlice.reducer;
