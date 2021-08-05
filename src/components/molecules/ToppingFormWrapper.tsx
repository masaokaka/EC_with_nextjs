import { FC } from "react";
import { FormLabel } from "@material-ui/core";
import { SelectToppingForm } from ".";
import { CartTopType } from "../../features/cart/cartSlice";
import { ToppingType } from "../../features/topping/toppingsSlice";

interface Props {
  toppings: ToppingType[];
  addedToppings: CartTopType[];
  setAddedToppings: React.Dispatch<React.SetStateAction<CartTopType[]>>;
}

const ToppingFormWrapper: FC<Props> = ({
  toppings,
  addedToppings,
  setAddedToppings,
}) => {
  return (
    <>
      <FormLabel component="div" style={{ margin: 10 }}>
        トッピング
      </FormLabel>
      {toppings.map((topping) => (
        <SelectToppingForm
          topping={topping}
          addedToppings={addedToppings}
          setAddedToppings={setAddedToppings}
          key={topping._id}
        />
      ))}
    </>
  );
};

export default ToppingFormWrapper;
