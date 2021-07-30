import { Fragment, FC, useEffect } from "react";
import { Header, Footer, Sidenav } from ".";
import { Inner } from "../atoms";
import { auth } from "../../config/firebase/index";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import {
  getUserinfoAsync,
  unsetUser,
  selectUserInfoStatus,
} from "../../store/features/userinfo/userinfoSlice";
import {
  fetchAllItemsAsync,
  selectItemsStatus,
  selectItemsErrorMsg,
} from "../../store/features/item/itemsSlice";
import {
  fetchAllToppingsAsync,
  selectToppingsStatus,
} from "../../store/features/topping/toppingsSlice";
import {
  unsetCart,
  fetchCartAsync,
  selectCartStatus,
} from "../../store/features/cart/cartSlice";
import {
  unsetOrders,
  fetchOrdersAsync,
} from "../../store/features/order/ordersSlice";
import { ADMIN_ID } from "../../static/admin";
import {
  getAllUsersAsync,
  selectUserInfosStatus,
  unsetUserInfos,
} from "../../store/features/userinfos/userinfosSlice";

const Layout: FC = (props) => {
  const dispatch = useAppDispatch();
  const userinfoStatus = useAppSelector(selectUserInfoStatus);
  const itemsStatus = useAppSelector(selectItemsStatus);
  const itemsError = useAppSelector(selectItemsErrorMsg);
  const toppingsStatus = useAppSelector(selectToppingsStatus);
  const userinfosStatus = useAppSelector(selectUserInfosStatus);
  const cartStatus = useAppSelector(selectCartStatus);

  //同じタイミングでmongoDBのセッションにアクセスするとエラーが出る。未解決
  //Layoutで全てのコンポーネントをラップするので、ここでデータの取得はやってしまう。
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;
        console.log(uid);
        dispatch(getUserinfoAsync({ uid }));
        // dispatch(fetchCartAsync({ uid }));
        // dispatch(fetchOrdersAsync({ uid }));
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
      {/* エラーメッセージのコンポーネント */}
      {/* インフォメーションのコンポーネント */}
      <main>
        <Inner>{props.children}</Inner>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
