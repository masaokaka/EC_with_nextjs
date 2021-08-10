import { ItemType } from "../../features/item/itemsSlice";
import { SIZE_L_STATUS, SIZE_M_STATUS } from "../../static/const";
import {
  createRandomId,
  calcTotal,
  searchAddress,
  validateOrderDate,
  timestampToDate,
} from "../functions";

test("ランダムID生成関数のランダム性のテスト", () => {
  const max = 100;
  for (let i = 0; i <= max; i++) {
    expect(createRandomId()).not.toBe(createRandomId());
  }
});

test("計算処理の確認", () => {
  const items: ItemType[] = [
    {
      _id: "1",
      name: "1カレー",
      text: "1美味しいカレーです",
      mprice: 2000,
      lprice: 3000,
      img: "1URL",
    },
    {
      _id: "2",
      name: "2カレー",
      text: "2美味しいカレーです",
      mprice: 800,
      lprice: 1550,
      img: "2URL",
    },
  ];
  const itemId = "1"; //商品
  const itemNum = 1; //個数
  const toppings = [
    { toppingId: "1", size: SIZE_M_STATUS },
    { toppingId: "2", size: SIZE_L_STATUS },
  ];
  const resultM = (items[0].mprice! + 200 + 300) * itemNum;
  const resultL = (items[0].lprice! + 200 + 300) * itemNum;
  expect(calcTotal(items, itemId, SIZE_M_STATUS, itemNum, toppings)).toBe(
    resultM
  );
  expect(calcTotal(items, itemId, SIZE_L_STATUS, itemNum, toppings)).toBe(
    resultL
  );
});

test("住所検索APIのデータ取得テスト1", () => {
  return expect(searchAddress("174-0042")).resolves.toBe("東京都板橋区東坂下");
});
test("住所検索APIのデータ取得テスト2", () => {
  return expect(searchAddress("000-0000")).resolves.toBe(
    "取得に失敗しました。"
  );
});

test("日付バリデーションのテスト1", () => {
  expect(validateOrderDate("")).toBe(false);
});
//現在時刻の3時間後以降しか注文できない処理(日付を変更して試す)
test("日付バリデーションのテスト2", () => {
  let now_plus_3hours = new Date();
  now_plus_3hours.setHours(now_plus_3hours.getHours() + 4);
  let str = String(now_plus_3hours);
  expect(validateOrderDate(str)).toBe(true);
});

test("タイムスタンプを文字列に変換する1", () => {
  expect(timestampToDate(1624409777)).toBe("2021/6/23 9:56:17");
});
test("タイムスタンプを文字列に変換する2", () => {
  expect(timestampToDate("aaaa")).toBe("Invalid Date Invalid Date");
});
