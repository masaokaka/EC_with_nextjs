import { FC } from "react";
import { CartTopType } from "../../store/features/cart/cartSlice";
import { ToppingType } from "../../store/features/topping/toppingsSlice";
interface Props {
  toppings: ToppingType[];
  cartTopping: CartTopType;
}

const ToppingsTableCell: FC<Props> = ({ toppings, cartTopping }) => {
  return (
    <>
      {toppings.map(
        (topping, index) =>
          cartTopping.toppingId === topping._id && (
            <div key={index}>
              <span>{topping.name}：</span>
              {cartTopping.size === 0 ? (
                <span>{topping.mprice}円</span>
              ) : (
                <span>{topping.lprice}円</span>
              )}
            </div>
          )
      )}
    </>
  );
};

export default ToppingsTableCell;
