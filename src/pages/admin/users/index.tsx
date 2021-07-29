import { FC } from "react";
import { Container } from "@material-ui/core";
import { useAppSelector } from "../../../store/app/hooks";
import { selectUserInfos } from "../../../store/features/userinfos/userinfosSlice";
import {
  AdminUsersTable,
  AdminHeaderBtns,
} from "../../../components/organisms";

const UserList: FC = () => {
  const userInfos = useAppSelector(selectUserInfos);
  return (
    <Container>
      <AdminHeaderBtns />
      <h2>ユーザー情報</h2>
      <AdminUsersTable userInfos={userInfos} />
    </Container>
  );
};

export default UserList;
