import { FC } from "react";
import { Container, Box } from "@material-ui/core";
import { useRouter } from "next/router";
import {
  Btn,
  ZipcodeInputHookForm,
  CalenderInputHookForm,
  PaymentRadioHookForm,
  TextFieldHookForm,
} from "../atoms";
import { useDispatch } from "react-redux";
import { UserInfoType } from "../../features/userinfo/userinfoSlice";
import {
  OrderInfoType,
  OrderType,
  orderAsync,
} from "../../features/order/ordersSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { CartType } from "../../features/cart/cartSlice";
import {
  ORDER_STATUS_PAID,
  ORDER_STATUS_UNPAID,
  ORDER_COMP_TOKEN,
  EMAIL_WITHOUT_WHITESPACE_REGEX,
  EMAIL_ERROR_MSG,
  ADDRESS_ERROR_MSG,
  NAME_ERROR_MSG,
  TEL_REGEX,
  TEL_ERROR_MSG,
  CARD_NUMBER_REGEX,
  CARDNUMBER_ERROR_MSG,
} from "../../static/const";

interface Props {
  cart: CartType;
  userInfo: UserInfoType;
  totalPrice: number;
}

const OrderForm: FC<Props> = ({ cart, userInfo, totalPrice }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm<OrderInfoType>({
    mode: "onBlur",
    defaultValues: {
      name: userInfo.name,
      email: userInfo.email,
      zipcode: userInfo.zipcode,
      address: userInfo.address,
      tel: userInfo.tel,
      status: 1,
      orderDatetime: "",
      payType: 1,
      cardNo: "",
      timestamp: 0,
      totalPrice: 0,
    },
  });
  //Payment Method hange watcher
  const watchPayType = watch("payType", 1);

  const doOrder: SubmitHandler<OrderInfoType> = (data) => {
    let timestamp = new Date();
    data.timestamp = Math.floor(timestamp.getTime() / 1000);
    data.totalPrice = totalPrice;
    if (watchPayType === ORDER_STATUS_PAID) {
      data.status = ORDER_STATUS_PAID;
    } else {
      data.status = ORDER_STATUS_UNPAID;
      data.cardNo = "";
    }
    let new_order: OrderType = {
      _id: cart._id,
      uid: cart.uid,
      itemInfo: cart.itemInfo,
      name: data.name,
      email: data.email,
      zipcode: data.zipcode,
      address: data.address,
      tel: data.tel,
      status: data.status,
      orderDatetime: data.orderDatetime,
      payType: data.payType,
      cardNo: data.cardNo,
      timestamp: data.timestamp,
      totalPrice: data.totalPrice,
    };
    dispatch(orderAsync({ order: new_order }));
    localStorage.setItem("token-order-complete", ORDER_COMP_TOKEN);
    router.push("/ordercomplete");
  };
  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <h2>配送先情報</h2>
        <form onSubmit={handleSubmit(doOrder)}>
          {/* 名前 */}
          <TextFieldHookForm
            formName="name"
            label="名前"
            type="text"
            control={control}
            error={errors.name!}
            errorMsg={NAME_ERROR_MSG}
          />
          {/* メールアドレス */}
          <TextFieldHookForm
            formName="email"
            label="メールアドレス"
            type="text"
            control={control}
            error={errors.email!}
            pattern={EMAIL_WITHOUT_WHITESPACE_REGEX}
            errorMsg={EMAIL_ERROR_MSG}
          />
          {/* 電話番号 */}
          <TextFieldHookForm
            formName="tel"
            label="電話番号"
            type="text"
            control={control}
            error={errors.tel!}
            pattern={TEL_REGEX}
            errorMsg={TEL_ERROR_MSG}
          />
          {/* 郵便番号 */}
          <ZipcodeInputHookForm
            control={control}
            error={errors.zipcode!}
            getValues={getValues}
            setValue={setValue}
            setError={setError}
          />
          {/* 住所 */}
          <TextFieldHookForm
            formName="address"
            label="住所"
            type="text"
            control={control}
            error={errors.address!}
            errorMsg={ADDRESS_ERROR_MSG}
          />
          {/* カレンダー */}
          <CalenderInputHookForm
            control={control}
            error={errors.orderDatetime!}
            setValue={setValue}
            clearErrors={clearErrors}
            setError={setError}
          />
          {/* 支払い方法 */}
          <PaymentRadioHookForm
            control={control}
            error={errors.payType!}
            watchPayType={watchPayType!}
          />
          {/* カード番号 */}
          {watchPayType === 2 && (
            <TextFieldHookForm
              formName="cardNo"
              label="クレジットカード番号"
              type="text"
              control={control}
              error={errors.cardNo!}
              pattern={CARD_NUMBER_REGEX}
              errorMsg={CARDNUMBER_ERROR_MSG}
            />
          )}
          <Box mt={3}>
            <Btn text="注文を確定する" onClick={handleSubmit(doOrder)} />
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default OrderForm;
