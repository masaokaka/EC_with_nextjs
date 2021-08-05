import { useRouter } from "next/router";
import { useState, FC, useMemo, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { ItemType, selectItems } from "../../features/item/itemsSlice";
import {
  selectToppings,
  ToppingType,
} from "../../features/topping/toppingsSlice";
import { useAppSelector } from "../../app/hooks";
import { Container, Grid } from "@material-ui/core";
import {
  ItemDetail,
  SelectNumForm,
  ToppingFormWrapper,
} from "../../components/molecules";
import { Btn, Price, RadioInput } from "../../components/atoms";
import { createRandomId, calcTotal } from "../../helpers/functions";
import { selectUid } from "../../features/userinfo/userinfoSlice";
import {
  SIZE_M_STATUS,
  SIZE_NONE_STATUS,
  ORDER_STATUS_CART,
} from "../../static/const";
import {
  selectCart,
  CartType,
  CartItemType,
  setCart,
  addItemToCartAsync,
  createCartAsync,
  CartTopType,
} from "../../features/cart/cartSlice";
import Topping from "../../models/topping";
import Item from "../../models/item";
import connectDB from "../../config/mongoDB";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ONE_MINUTE } from "../../static/const";
import Head from "next/head";

interface Props {
  item: string; //商品一個
  toppings: string; //トッピング配列
}

const ItemInfo: FC<Props> = (props) => {
  const item: ItemType = JSON.parse(props.item);
  const toppings: ToppingType[] = JSON.parse(props.toppings);
  const dispatch = useDispatch();
  const router = useRouter();
  const uid = useAppSelector(selectUid);
  const items = useAppSelector(selectItems);
  const cart = useAppSelector(selectCart);
  const [addedToppings, setAddedToppings] = useState<CartTopType[]>([]);
  const [itemSize, setItemSize] = useState(SIZE_M_STATUS);
  const [itemNum, setItemNum] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemId, setItemId] = useState("");

  useEffect(() => {
    if (router.query.itemId && typeof router.query.itemId === "string") {
      setItemId(router.query.itemId);
    }
  }, [router]);

  useEffect(() => {
    if (item !== undefined && items.length !== 0) {
      let total: number = calcTotal(
        items,
        item._id!,
        itemSize,
        itemNum,
        addedToppings
      );
      setTotalPrice(total);
    } else {
      //SSGで計算が走った時に、合計金額は一旦０円で表示する。
      setTotalPrice(0);
    }
  }, [item, addedToppings, itemSize, itemNum, items]);

  const doAddCart = () => {
    //選択されたトッピングを整理
    let selectedToppings: CartTopType[] = addedToppings.filter(
      (top) => top.size !== SIZE_NONE_STATUS
    );
    //カート内へ追加する商品情報をまとめる
    let cartItem: CartItemType = {
      id: createRandomId(),
      itemId: itemId,
      itemNum: itemNum,
      itemSize: itemSize,
      toppings: selectedToppings,
    };
    //ユーザーがログインしていたら
    if (uid) {
      //カートにすでに何かが入っていた場合
      if (Object.keys(cart).length !== 0) {
        dispatch(
          addItemToCartAsync({
            itemInfo: [...cart.itemInfo!, cartItem],
            uid: uid,
          })
        );
        router.push("/cart");
        //カートが存在していなかった場合
      } else {
        //新しいカートを作成
        let new_cart: CartType = {
          status: ORDER_STATUS_CART,
          itemInfo: [cartItem],
          uid: uid,
        };
        dispatch(createCartAsync({ cart: new_cart }));
        router.push("/cart");
      }
      //ユーザーがログインしていない場合
    } else {
      //カートが存在していなかった場合
      if (Object.keys(cart).length === 0) {
        let new_cart = {
          itemInfo: [cartItem],
          status: 0,
        };
        dispatch(setCart(new_cart));
        router.push("/cart");
      } else {
        //すでにカートに何か入っていた場合
        let new_cart: CartType = { ...cart };
        new_cart.itemInfo = [...new_cart.itemInfo!, cartItem];
        dispatch(setCart(new_cart));
        router.push("/cart");
      }
    }
  };

  return (
    <Fragment>
      <Head>
        <title>
          ラクラクカリー : {item.name} {item.text}
        </title>
        <meta name="description" content={item.text} />
      </Head>
      <Container>
        <h2>商品詳細</h2>
        <ItemDetail item={item} />
        <Grid container direction="column" alignContent="center">
          <Grid item>
            <RadioInput
              item={item}
              itemSize={itemSize}
              setItemSize={setItemSize}
            />
          </Grid>
          <Grid item>
            <SelectNumForm itemNum={itemNum} setItemNum={setItemNum} />
          </Grid>
          <Grid item>
            <ToppingFormWrapper
              toppings={toppings}
              addedToppings={addedToppings}
              setAddedToppings={setAddedToppings}
            />
          </Grid>
          <Grid item>
            <Price price={totalPrice} bigsize={true} tax={true} />
          </Grid>
          <Grid item>
            <Btn text="カートに追加する" onClick={doAddCart} />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<Props> = async (
  context: GetStaticPropsContext
) => {
  console.log("iteminfo build");
  const { params } = context;
  const itemId = params!.itemId;
  let item: ItemType = {};
  let toppings = [];
  try {
    await connectDB();
    item = await Item.findOne({ _id: itemId });
    toppings = await Topping.find({});
  } catch (error) {
    console.log(error.message);
  }
  return {
    props: {
      item: JSON.stringify(item),
      toppings: JSON.stringify(toppings),
    },
    revalidate: ONE_MINUTE * 30, //seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  let items: any[] = [];
  let pathWithParams: any[] = [];
  try {
    await connectDB();
    items = await Item.find({});
    pathWithParams = items.map((item) => ({
      params: { itemId: item._id!.toString() },
    }));
  } catch (error) {
    console.log(error.message);
  }
  return {
    paths: pathWithParams,
    fallback: false, //上記のパスが全てのパターンだと伝えている。
  };
};

export default ItemInfo;
