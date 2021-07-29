import { FC } from "react";
import { useDispatch } from "react-redux";
import { Table, TableCell, TableRow, TableBody } from "@material-ui/core";
import { Btn, Price } from "../atoms";
import { timestampToDate } from "../../helpers/functions";
import { ItemsTableHead, CartItemsTableRow } from "./";
import {
  OrderType,
  updateOrderStatusAsync,
} from "../../store/features/order/ordersSlice";
import { ItemType } from "../../store/features/item/itemsSlice";
import { ToppingType } from "../../store/features/topping/toppingsSlice";
import {
  ORDER_STATUS_UNPAID,
  ORDER_STATUS_PAID,
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_UNDELIVERED,
} from "../../static/const";

interface Props {
  items: ItemType[];
  toppings: ToppingType[];
  order: OrderType;
  orders: OrderType[];
  uid: string;
}

const OrderItemsTableRow: FC<Props> = ({
  items,
  toppings,
  order,
  orders,
  uid,
}) => {
  const dispatch = useDispatch();

  const cancelOrder = (_id: string) => {
    if (window.confirm("注文をキャンセルしますか?")) {
      dispatch(
        updateOrderStatusAsync({ status: ORDER_STATUS_CANCELLED, _id: _id })
      );
    } else {
      return;
    }
  };
  return (
    <TableRow>
      <TableCell colSpan={2} align="center">
        {timestampToDate(order.timestamp!)}
      </TableCell>
      <TableCell colSpan={2} align="center">
        <Price price={order.totalPrice!} tax={false} bigsize={false} />
      </TableCell>
      <TableCell colSpan={2} align="center">
        {order.status === ORDER_STATUS_UNPAID && (
          <h3 style={{ color: "red" }}>未入金</h3>
        )}
        {order.status === ORDER_STATUS_PAID && (
          <h3 style={{ color: "orange" }}>入金済み</h3>
        )}
        {order.status === ORDER_STATUS_UNDELIVERED && (
          <h3 style={{ color: "orange" }}>発送前</h3>
        )}
        {order.status === ORDER_STATUS_DELIVERED && (
          <h3 style={{ color: "gray" }}>発送済み</h3>
        )}
        {order.status === ORDER_STATUS_CANCELLED && (
          <h3 style={{ color: "gray" }}>キャンセル済み</h3>
        )}
        {order.status! <= ORDER_STATUS_UNDELIVERED && (
          <Btn text="注文キャンセル" onClick={() => cancelOrder(order._id!)} />
        )}
      </TableCell>
      <TableCell colSpan={6}>
        <Table>
          <ItemsTableHead
            heads={[
              { text: "商品名", col: 2 },
              { text: "価格(税抜き)", col: 2 },
              { text: "数量", col: 2 },
              { text: "トッピング", col: 2 },
            ]}
          />
          <TableBody>
            {order.itemInfo !== undefined &&
              order.itemInfo.map((item, index) => (
                <CartItemsTableRow
                  key={index}
                  items={items}
                  toppings={toppings}
                  cart={order}
                  cartItem={item}
                  show={true}
                  status={order.status!}
                  uid={uid}
                />
              ))}
          </TableBody>
        </Table>
      </TableCell>
    </TableRow>
  );
};

export default OrderItemsTableRow;
