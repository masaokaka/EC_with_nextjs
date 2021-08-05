import React, { FC } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { ItemType } from "../../features/item/itemsSlice";

interface Props {
  item: ItemType | undefined;
  itemSize: number;
  setItemSize: React.Dispatch<React.SetStateAction<number>>;
}

const RadioInput: FC<Props> = ({ item, itemSize, setItemSize }) => {
  return (
    <>
      <FormLabel component="div" style={{ margin: 10 }}>
        サイズ
      </FormLabel>
      <FormControl component="fieldset">
        {item !== undefined && (
          <RadioGroup
            aria-label="itemSize"
            name="itemSize"
            value={itemSize}
            onChange={(e) => setItemSize(parseInt(e.target.value))}
          >
            <FormControlLabel
              value={0}
              control={<Radio />}
              label={`Mサイズ：${item.mprice}円(税抜)`}
            />
            <FormControlLabel
              value={1}
              control={<Radio />}
              label={`Lサイズ：${item.lprice}円(税抜)`}
            />
          </RadioGroup>
        )}
      </FormControl>
    </>
  );
};

export default RadioInput;
