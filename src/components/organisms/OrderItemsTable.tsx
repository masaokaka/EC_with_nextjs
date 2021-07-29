import { FC } from "react";
import { Table, TableBody, TableContainer, Paper } from "@material-ui/core";
import { OrderType } from "../../store/features/order/ordersSlice";
import { ItemType } from "../../store/features/item/itemsSlice";
import { ToppingType } from "../../store/features/topping/toppingsSlice";
import { ItemsTableHead, OrderItemsTableRow } from "../molecules";
interface Props {
  items: ItemType[];
  toppings: ToppingType[];
  orders: OrderType[];
  uid: string;
}
const OrderItemsTable: FC<Props> = ({ items, toppings, orders, uid }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <ItemsTableHead
          heads={[
            { text: "注文日時", col: 2 },
            { text: "合計金額(税抜)", col: 2 },
            { text: "ステータス", col: 2 },
            { text: "商品情報", col: 8 },
          ]}
        />
        <TableBody>
          {orders.map((order, index) => (
            <OrderItemsTableRow
              key={index}
              items={items}
              toppings={toppings}
              order={order}
              orders={orders}
              uid={uid}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderItemsTable;
