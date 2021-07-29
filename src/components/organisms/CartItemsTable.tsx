import { Table, TableBody, TableContainer, Paper } from "@material-ui/core";
import { CartType } from "../../store/features/cart/cartSlice";
import { ItemType } from "../../store/features/item/itemsSlice";
import { ToppingType } from "../../store/features/topping/toppingsSlice";
import { ItemsTableHead, CartItemsTableRow } from "../molecules";
import { ORDER_STATUS_CART } from "../../static/const";
import { FC } from "react";

interface Props {
  items: ItemType[];
  toppings: ToppingType[];
  cart: CartType;
  show: boolean;
  uid: string | undefined;
}
const CartItemsTable: FC<Props> = ({ items, toppings, cart, show, uid }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <ItemsTableHead
          heads={[
            { text: "", col: 2 },
            { text: "商品名", col: 2 },
            { text: "価格(税抜)", col: 2 },
            { text: "個数", col: 2 },
            { text: "トッピング：価格(税抜)", col: 2 },
            { text: "", col: 2 },
          ]}
        />
        <TableBody>
          {cart.itemInfo!.map((cartItem, index) =>
            items.map(
              (item) =>
                item._id === cartItem.itemId && (
                  <CartItemsTableRow
                    key={index}
                    items={items}
                    toppings={toppings}
                    cart={cart}
                    cartItem={cartItem}
                    show={show}
                    status={ORDER_STATUS_CART}
                    uid={uid}
                  />
                )
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartItemsTable;
