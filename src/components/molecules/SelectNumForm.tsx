import { Select, FormControl, MenuItem, FormLabel } from "@material-ui/core";
import React, { FC } from "react";

interface Props {
  itemNum: number;
  setItemNum: React.Dispatch<React.SetStateAction<number>>;
}

const maxNum: number = 15;
let nums: number[] = [];
for (let i = 1; i <= maxNum; i++) {
  nums.push(i);
}

const SelectNumForm: FC<Props> = ({ itemNum, setItemNum }) => {
  return (
    <>
      <FormLabel component="div" style={{ margin: 10 }}>
        数量
      </FormLabel>
      <FormControl component="fieldset">
        <Select
          name="数量"
          value={itemNum}
          onChange={(e: any) => setItemNum(e.target.value)}
        >
          {nums.map((num, index) => (
            <MenuItem value={num} key={index}>
              {num}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectNumForm;
