import { FC } from "react";
import { useDispatch } from "react-redux";
import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import {
  ToppingType,
  deleteToppingAsync,
} from "../../../features/topping/toppingsSlice";
import { ItemsTableHead } from "../../molecules";
import { Btn, Price } from "../../atoms";

interface Props {
  toppings: ToppingType[];
}
export const AdminToppingsTable: FC<Props> = ({ toppings }) => {
  const dispatch = useDispatch();
  const doDeleteTopping = (_id: string) => {
    dispatch(deleteToppingAsync({ _id: _id }));
  };
  return (
    <TableContainer>
      <Table>
        <ItemsTableHead
          heads={[
            { text: "ID", col: 2 },
            { text: "商品名", col: 2 },
            { text: "M価格(税抜)", col: 2 },
            { text: "L価格(税抜)", col: 2 },
            { text: "", col: 2 },
          ]}
        />
        <TableBody>
          {toppings.map((topping) => (
            <TableRow key={topping._id}>
              <TableCell colSpan={2} align="center">
                {topping._id}
              </TableCell>
              <TableCell colSpan={2} align="center">
                {topping.name}
              </TableCell>
              <TableCell colSpan={2} align="center">
                <Price price={topping.mprice!} tax={false} bigsize={false} />
              </TableCell>
              <TableCell colSpan={2} align="center">
                <Price price={topping.lprice!} tax={false} bigsize={false} />
              </TableCell>
              <TableCell colSpan={2} align="center">
                <Btn
                  text="削除"
                  onClick={() => doDeleteTopping(topping._id!)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminToppingsTable;
