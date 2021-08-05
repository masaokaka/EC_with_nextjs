import { FC, useEffect } from "react";
import { Container } from "@material-ui/core";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectUserInfos,
  getAllUsersAsync,
} from "../../../features/userinfos/userinfosSlice";
import {
  AdminUsersTable,
  AdminHeaderBtns,
} from "../../../components/organisms";
import { ADMIN_ID } from "../../../static/admin";
import { selectUid } from "../../../features/userinfo/userinfoSlice";

const Users: FC = () => {
  const dispatch = useAppDispatch();
  const userInfos = useAppSelector(selectUserInfos);
  const uid = useAppSelector(selectUid);
  useEffect(() => {
    if (uid === ADMIN_ID) dispatch(getAllUsersAsync());
  }, [dispatch, ADMIN_ID, uid]);
  return (
    <Container>
      <AdminHeaderBtns />
      <h2>ユーザー情報</h2>
      <AdminUsersTable userInfos={userInfos} />
    </Container>
  );
};

export default Users;
