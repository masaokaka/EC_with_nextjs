import { createRandomId } from "../helpers/functions";

export const TAX = 0.1;
export const ONE_MINUTE = 60;

export const SIZE_M_STATUS = 0;
export const SIZE_L_STATUS = 1;
export const SIZE_NONE_STATUS = 9;
export const SIZE_M_PRICE = 200;
export const SIZE_L_PRICE = 300;

export const ORDER_STATUS_CART = 0;
export const ORDER_STATUS_UNPAID = 1;
export const ORDER_STATUS_PAID = 2;
export const ORDER_STATUS_UNDELIVERED = 3;
export const ORDER_STATUS_DELIVERED = 4;
export const ORDER_STATUS_CANCELLED = 9;

// let string = createRandomId();
export const ORDER_COMP_TOKEN = "adacaeccdeced";

//regex
export const EMAIL_WITHOUT_WHITESPACE_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const PRICE_REGEX = /\d[0-9]/g;
export const TEL_REGEX = /\d{2,5}[-(]\d{1,4}[-)]\d{4}$/;
export const CARD_NUMBER_REGEX = /\d[0-9]{13}/g;
export const PASSWORD_WITHOUT_WHITESPACE_REGEX =
  /^[a-zA-Z0-9!#$%&()*+,.:;=?@[\]^_{}-]+$/;

//フォーム用エラーメッセージ
export interface ErrorMsgType {
  required: string;
  pattern?: string;
  maxLength?: string;
  minLength?: string;
}
export const EMAIL_ERROR_MSG: ErrorMsgType = {
  required: "メールアドレスを入力してください",
  pattern: "形式が違います",
};
export const PRICE_ERROR_MSG: ErrorMsgType = {
  required: "金額を入力してください",
  pattern: "半角数字で入力して下さい",
};
export const PASSWORD_ERROR_MSG: ErrorMsgType = {
  required: "パスワードを入力してください",
  pattern: "形式が違います",
  maxLength: "パスワードは12文字以内です",
  minLength: "パスワードは8文字以上です",
};
export const TEL_ERROR_MSG: ErrorMsgType = {
  required: "電話番号を入力してください",
  pattern: "XXX-XXXX-XXXXの形式で入力してください",
};
export const CARDNUMBER_ERROR_MSG: ErrorMsgType = {
  required: "電話番号を入力してください",
  pattern: "XXX-XXXX-XXXXの形式で入力してください",
};
export const ADDRESS_ERROR_MSG: ErrorMsgType = {
  required: "住所を入力してください",
};
export const NAME_ERROR_MSG: ErrorMsgType = {
  required: "名前を入力してください",
};
export const USERNAME_ERROR_MSG: ErrorMsgType = {
  required: "ユーザー名を入力してください",
  maxLength: "ユーザー名は10文字以内で入力してください",
};
