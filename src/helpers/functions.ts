import { ItemType } from "../store/features/item/itemsSlice";
import { CartTopType } from "../store/features/cart/cartSlice";
import axios from "axios";
import {
  SIZE_M_STATUS,
  SIZE_L_STATUS,
  SIZE_M_PRICE,
  SIZE_L_PRICE,
} from "../static/const";

//Id用にランダムな文字列を生成
export const createRandomId = (): string => {
  return Math.random().toString(32).substring(2);
};

//小計計算処理(税込)
export const calcTotal = (
  items: ItemType[],
  itemId: string,
  itemSize: number,
  itemNum: number,
  addedToppings: CartTopType[]
) => {
  let total = 0;
  let index = items.findIndex((it) => {
    return it._id === itemId;
  });
  if (itemSize === SIZE_M_STATUS) {
    total += items[index].mprice! * itemNum;
  } else if (itemSize === SIZE_L_STATUS) {
    total += items[index].lprice! * itemNum;
  }
  let selectedToppings: CartTopType[] = addedToppings.filter(
    (top) => top.size !== 9
  );
  selectedToppings.forEach((top) => {
    if (top.size === SIZE_M_STATUS) {
      total += SIZE_M_PRICE * itemNum;
    } else if (top.size === SIZE_L_STATUS) {
      total += SIZE_L_PRICE * itemNum;
    }
  });
  return total;
};

//住所検索API
export const searchAddress = (value: string) => {
  return axios
    .get(`https://api.zipaddress.net/?zipcode=${value}`)
    .then((res) => {
      return String(res.data.data.fullAddress);
    })
    .catch(() => {
      return "取得に失敗しました。";
    });
};

//配達日時のバリデーション
export const validateOrderDate = (selected: string) => {
  let clickday = new Date();
  let now = Math.floor(clickday.getTime() / 1000);
  let checkyear = Number(selected.slice(0, 4));
  let checkmonth = Number(selected.slice(5, 7));
  let checkday = Number(selected.slice(8, 10));
  let checkhour = Number(selected.slice(11, 13));
  let checkminutes = Number(selected.slice(14, 16));
  let selectedDay = new Date(
    checkyear,
    checkmonth - 1,
    checkday,
    checkhour - 3, //後々の条件式のために3時間分減らしている
    checkminutes
  );
  const select = Math.floor(selectedDay.getTime() / 1000);
  if (now > select) {
    return false;
  } else {
    return true;
  }
};

//タイムスタンプをDateストリングに変換
export const timestampToDate = (timestamp: number): String => {
  let dateTime = new Date(timestamp * 1000);
  let date = dateTime.toLocaleDateString(); // => 2019/9/4
  let time = dateTime.toLocaleTimeString("ja-JP"); // => 12:03:35
  return date + " " + time;
};
