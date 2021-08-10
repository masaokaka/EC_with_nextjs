import { useAppSelector, useAppDispatch } from "../app/hooks";
import { useEffect } from "react";
import { OrderItemsTable } from "../components/organisms";
import { Container } from "@material-ui/core";
import { selectOrders } from "../features/order/ordersSlice";
import { selectUid } from "../features/userinfo/userinfoSlice";
import { selectItems } from "../features/item/itemsSlice";
import { selectToppings } from "../features/topping/toppingsSlice";
import { fetchOrdersAsync } from "../features/order/ordersSlice";
import { useRouter } from "next/router";
import { NextPage } from "next";

const OrderHistory: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const uid = useAppSelector(selectUid);
  const items = useAppSelector(selectItems);
  const toppings = useAppSelector(selectToppings);
  const orders = useAppSelector(selectOrders);

  useEffect(() => {
    if (uid) {
      dispatch(fetchOrdersAsync({ uid: uid }));
      return;
    } else {
      router.push("/");
    }
  }, [uid, router, dispatch]);

  return (
    <Container>
      <h2>注文履歴</h2>
      {orders.length !== 0 ? (
        <OrderItemsTable
          items={items}
          toppings={toppings}
          orders={orders}
          uid={uid!}
        />
      ) : (
        <h3>注文履歴がありません</h3>
      )}
    </Container>
  );
};

export default OrderHistory;
