import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  fetch_all_toppings,
  add_topping_to_db,
  delete_topping_from_db,
} from "./toppingsAPI";

interface ThunkConfig {
  state: RootState;
  rejectValue: {
    errorMsg: string;
  };
}

export interface ToppingType {
  _id?: string;
  name?: string;
  mprice?: number;
  lprice?: number;
}
interface ToppingsState {
  value: ToppingType[];
  status: "idle" | "loading" | "failed";
  errorMsg: string | null;
}
const initialState: ToppingsState = {
  value: [],
  status: "idle",
  errorMsg: null,
};

//トッピング取得
export const fetchAllToppingsAsync = createAsyncThunk<
  ToppingType[],
  undefined,
  ThunkConfig
>("toppings/fetch", async (_, { rejectWithValue }) => {
  try {
    const toppings = await fetch_all_toppings();
    return toppings;
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
});

//トッピング追加
export const addToppingAsync = createAsyncThunk<
  ToppingType,
  { topping: ToppingType },
  ThunkConfig
>("toppings/add", async ({ topping }, { rejectWithValue }) => {
  try {
    const new_topping = await add_topping_to_db(topping);
    return new_topping;
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
});

//トッピング削除
export const deleteToppingAsync = createAsyncThunk<
  string,
  { _id: string },
  ThunkConfig
>("toppings/delete", async ({ _id }, { rejectWithValue }) => {
  try {
    await delete_topping_from_db(_id);
    return _id;
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
});

export const ToppingsSlice = createSlice({
  name: "toppings",
  initialState,
  reducers: {
    unsetToppings: () => {
      return initialState;
    },
    unsetToppingsError: (state) => {
      state.status = "idle";
      state.errorMsg = null;
      return state;
    },
  },
  extraReducers: (builder) => {
    //トッピング全件取得
    builder.addCase(fetchAllToppingsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllToppingsAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = action.payload;
      state.errorMsg = null;
    });
    builder.addCase(fetchAllToppingsAsync.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload) {
        state.errorMsg = action.payload.errorMsg;
      }
    });
    //トッピング追加
    builder.addCase(addToppingAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addToppingAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = [...state.value, action.payload];
      state.errorMsg = null;
    });
    builder.addCase(addToppingAsync.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload) {
        state.errorMsg = action.payload.errorMsg;
      }
    });
    //トッピング削除
    builder.addCase(deleteToppingAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteToppingAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = state.value.filter(
        (topping) => topping._id !== action.payload
      );
      state.errorMsg = null;
    });
    builder.addCase(deleteToppingAsync.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload) {
        state.errorMsg = action.payload.errorMsg;
      }
    });
  },
});

export const { unsetToppings, unsetToppingsError } = ToppingsSlice.actions;
export const selectToppings = (state: RootState) => state.toppings.value;
export const selectToppingsStatus = (state: RootState) => state.toppings.status;
export const selectToppingsErrorMsg = (state: RootState) =>
  state.toppings.errorMsg;

export default ToppingsSlice.reducer;
