import { FC } from "react";
import { TableCell, TableHead, TableRow } from "@material-ui/core";

export interface HeadsType {
  text: string;
  col: number;
}
interface Props {
  heads: HeadsType[];
}

const ItemsTableHead: FC<Props> = ({ heads }) => {
  return (
    <TableHead>
      <TableRow>
        {heads.map((head, index) => (
          <TableCell key={index} align="center" colSpan={head.col}>
            {head.text}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default ItemsTableHead;
