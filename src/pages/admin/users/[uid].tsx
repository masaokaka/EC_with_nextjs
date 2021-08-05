import { useEffect, useState, FC } from "react";
import { useRouter, NextRouter } from "next/router";
import { Container } from "@material-ui/core";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { Btn } from "../../../components/atoms";
import {
  OrderItemsTable,
  AdminHeaderBtns,
} from "../../../components/organisms";
import { UserInfoType } from "../../../features/userinfo/userinfoSlice";
import { selectUserInfos } from "../../../features/userinfos/userinfosSlice";
import {
  selectOrders,
  unsetOrders,
  fetchOrdersAsync,
} from "../../../features/order/ordersSlice";
import { selectItems } from "../../../features/item/itemsSlice";
import { selectToppings } from "../../../features/topping/toppingsSlice";

const UserEdit: FC = () => {
  const router: NextRouter = useRouter();
  const [uid, setUid] = useState<string>("");
  useEffect(() => {
    if (router.query.uid && typeof router.query.uid === "string") {
      setUid(router.query.uid);
    }
  }, [router]);
  const [user, setUser] = useState<UserInfoType>();
  const orders = useAppSelector(selectOrders);
  const items = useAppSelector(selectItems);
  const toppings = useAppSelector(selectToppings);
  const [toggle, setToggle] = useState(false);
  const userInfos = useAppSelector(selectUserInfos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let user = userInfos.filter((userInfo) => userInfo.uid === uid);
    setUser(user[0]);
    dispatch(fetchOrdersAsync({ uid: uid }));
    return () => {
      dispatch(unsetOrders());
    };
  }, [userInfos, uid, dispatch]);

  return (
    <Container>
      <AdminHeaderBtns />
      <h2>ユーザー情報詳細 (ID: {uid})</h2>
      {user && (
        <div>
          <div>
            <strong>名前：</strong>
            {user.name}
          </div>
          <div>
            <strong>Email：</strong>
            {user.email}
          </div>
          <div>
            <strong>TEL：</strong>
            {user.tel}
          </div>
          <div>
            <strong>住所情報：</strong>
            <div>〒{user.zipcode}</div>
            <div>{user.address}</div>
          </div>
          <Btn text="注文履歴の操作" onClick={() => setToggle(!toggle)} />
          {toggle &&
            (orders.length !== 0 ? (
              <OrderItemsTable
                items={items}
                toppings={toppings}
                orders={orders}
                uid={uid}
              />
            ) : (
              <h3>履歴がありません</h3>
            ))}
        </div>
      )}
    </Container>
  );
};

export default UserEdit;
