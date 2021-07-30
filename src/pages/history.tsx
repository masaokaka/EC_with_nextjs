import { useAppSelector, useAppDispatch } from "../store/app/hooks";
import { FC, useEffect } from "react";
import { OrderItemsTable } from "../components/organisms";
import { Container } from "@material-ui/core";
import { selectOrders } from "../store/features/order/ordersSlice";
import { selectUid } from "../store/features/userinfo/userinfoSlice";
import { selectItems } from "../store/features/item/itemsSlice";
import { selectToppings } from "../store/features/topping/toppingsSlice";
import { fetchOrdersAsync } from "../store/features/order/ordersSlice";
import { useRouter } from "next/router";

const OrderHistory: FC = () => {
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
