import { Item } from "./";
import { FC } from "react";
import Box from "@material-ui/core/Box";
import { ItemType } from "../../features/item/itemsSlice";

interface Props {
  items: ItemType[];
  noItem: boolean;
}

const Items: FC<Props> = ({ items, noItem }) => {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {noItem ? (
        <h3>該当する商品はありません</h3>
      ) : (
        items.map((item, index) => <Item item={item} key={index} />)
      )}
    </Box>
  );
};

export default Items;
