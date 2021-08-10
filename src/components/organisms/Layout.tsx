import { Fragment, FC, useEffect } from "react";
import { Header, Footer, Sidenav } from ".";
import { Inner, Notification } from "../atoms";
import { auth } from "../../config/firebase/index";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getUserinfoAsync,
  unsetUser,
  selectUserInfoStatus,
} from "../../features/userinfo/userinfoSlice";
import {
  fetchAllItemsAsync,
  selectItemsStatus,
  selectItemsErrorMsg,
} from "../../features/item/itemsSlice";
import {
  fetchAllToppingsAsync,
  selectToppingsStatus,
} from "../../features/topping/toppingsSlice";
import {
  unsetCart,
  fetchCartAsync,
  selectCartStatus,
  selectCartErrorMsg,
} from "../../features/cart/cartSlice";
import {
  unsetOrders,
  fetchOrdersAsync,
} from "../../features/order/ordersSlice";
import { ADMIN_ID } from "../../static/admin";
import {
  getAllUsersAsync,
  selectUserInfosStatus,
  unsetUserInfos,
} from "../../features/userinfos/userinfosSlice";
import useScroll from "../../hooks/scrolltotop";

const Layout: FC = (props) => {
  const dispatch = useAppDispatch();
  const userinfoStatus = useAppSelector(selectUserInfoStatus);
  const itemsStatus = useAppSelector(selectItemsStatus);
  const itemsError = useAppSelector(selectItemsErrorMsg);
  const toppingsStatus = useAppSelector(selectToppingsStatus);
  const userinfosStatus = useAppSelector(selectUserInfosStatus);
  const cartStatus = useAppSelector(selectCartStatus);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;
        dispatch(getUserinfoAsync({ uid }));
        dispatch(fetchCartAsync({ uid }));
        dispatch(fetchOrdersAsync({ uid }));
      } else {
        dispatch(unsetUser());
        dispatch(unsetUserInfos());
        dispatch(unsetCart());
        dispatch(unsetOrders());
      }
    });
    dispatch(fetchAllItemsAsync());
    dispatch(fetchAllToppingsAsync());
  }, [dispatch]);

  return (
    <Fragment>
      <Header />
      <Sidenav />
      <main>
        <Inner>{props.children}</Inner>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
