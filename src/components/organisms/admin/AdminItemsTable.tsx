import { useDispatch } from "react-redux";
import { FC } from "react";
import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { ItemType, deleteItemAsync } from "../../../features/item/itemsSlice";
import { ItemsTableHead } from "../../molecules";
import { Btn, Price } from "../../atoms";

interface Props {
  items: ItemType[];
}

const AdminItemsTable: FC<Props> = ({ items }) => {
  const dispatch = useDispatch();
  const doDeleteItem = (_id: string) => {
    dispatch(deleteItemAsync({ _id }));
  };
  return (
    <TableContainer>
      <Table>
        <ItemsTableHead
          heads={[
            { text: "ID", col: 2 },
            { text: "画像", col: 2 },
            { text: "商品名", col: 2 },
            { text: "M価格(税抜)", col: 2 },
            { text: "L価格(税抜)", col: 2 },
            { text: "", col: 2 },
          ]}
        />
        <TableBody>
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell colSpan={2} align="center">
                {item._id}
              </TableCell>
              <TableCell colSpan={2} align="center">
                <img src={item.img} width="180" height="140" alt="画像" />
              </TableCell>
              <TableCell colSpan={2} align="center">
                {item.name}
              </TableCell>
              <TableCell colSpan={2} align="center">
                <Price price={item.mprice!} tax={false} bigsize={false} />
              </TableCell>
              <TableCell colSpan={2} align="center">
                <Price price={item.lprice!} tax={false} bigsize={false} />
              </TableCell>
              <TableCell colSpan={2} align="center">
                <Btn text="削除" onClick={() => doDeleteItem(item._id!)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminItemsTable;
