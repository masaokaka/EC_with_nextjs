import { FC } from "react";
import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { ItemsTableHead } from "../../molecules";
import { IconBtn } from "../../atoms";
import { useRouter } from "next/router";
import { UserInfoType } from "../../../features/userinfo/userinfoSlice";

interface Props {
  userInfos: UserInfoType[];
}

const AdminUsersTable: FC<Props> = ({ userInfos }) => {
  const router = useRouter();
  return (
    <TableContainer>
      <Table>
        <ItemsTableHead
          heads={[
            { text: "No", col: 2 },
            { text: "ID", col: 2 },
            { text: "ユーザー名", col: 2 },
            { text: "メールアドレス", col: 2 },
            { text: "", col: 2 },
          ]}
        />
        <TableBody>
          {userInfos.map((user, index) => (
            <TableRow key={index}>
              <TableCell colSpan={2} align="center">
                {index + 1}
              </TableCell>
              <TableCell colSpan={2} align="center">
                {user.uid}
              </TableCell>
              <TableCell colSpan={2} align="center">
                {user.username}
              </TableCell>
              <TableCell colSpan={2} align="center">
                {user.email}
              </TableCell>
              <TableCell colSpan={2} align="center">
                <IconBtn
                  icon="Edit"
                  onClick={() => router.push(`/admin/users/${user.uid}`)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminUsersTable;
