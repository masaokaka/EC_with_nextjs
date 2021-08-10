import { Select, InputLabel, FormControl, MenuItem } from "@material-ui/core";
import { ToppingType } from "../../features/topping/toppingsSlice";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect, FC } from "react";
import { CartTopType } from "../../features/cart/cartSlice";

interface Props {
  topping: ToppingType;
  addedToppings: CartTopType[];
  setAddedToppings: React.Dispatch<React.SetStateAction<CartTopType[]>>;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
}));

const SelectToppingForm: FC<Props> = ({
  topping,
  addedToppings,
  setAddedToppings,
}) => {
  const classes = useStyles();
  const [size, setSize] = useState(9);

  useEffect(() => {
    //最初は空なので、空だったらたしてやる処理を書く。
    if (addedToppings.length === 0) {
      setAddedToppings([{ toppingId: topping._id!, size: size }]);
    } else {
      let index: number | null = null;
      addedToppings.forEach((top) => {
        if (top.toppingId === topping._id) {
          index = addedToppings.indexOf(top);
        }
      });
      if (index !== null) {
        addedToppings[index].size = size;
        setAddedToppings([...addedToppings]);
      } else {
        setAddedToppings([
          ...addedToppings,
          { toppingId: topping._id!, size: size },
        ]);
      }
    }
  }, [size]);
  return (
    <FormControl key={topping._id} className={classes.formControl}>
      <InputLabel id={topping.name}>{topping.name}</InputLabel>
      <Select
        labelId={topping.name}
        name={topping.name}
        value={size}
        onChange={(e: any) => setSize(e.target.value)}
      >
        <MenuItem value={9}>選択</MenuItem>
        <MenuItem value={0}>普通</MenuItem>
        <MenuItem value={1}>多め</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectToppingForm;
