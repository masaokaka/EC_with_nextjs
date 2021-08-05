import React, { useEffect, useState, FC } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HistoryIcon from "@material-ui/icons/History";
import AdminIcon from "@material-ui/icons/SupervisorAccount";
import MeetingRoomOutlined from "@material-ui/icons/MeetingRoomOutlined";
import MeetingRoom from "@material-ui/icons/MeetingRoom";
import { selectSidenav, toggle } from "../../features/sidenavSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectUid } from "../../features/userinfo/userinfoSlice";
import { ADMIN_ID } from "../../static/admin";
import { logout_from_firebase } from "../../features/userinfo/userinfoAPI";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});
interface SideNavMenuType {
  text: string;
  icon: JSX.Element;
  link: string;
}

const menu: SideNavMenuType[] = [
  { text: "ホーム", icon: <HomeIcon />, link: "/" },
  { text: "カート", icon: <ShoppingCartIcon />, link: "/cart" },
];
const userMenu: SideNavMenuType[] = [
  { text: "ホーム", icon: <HomeIcon />, link: "/" },
  { text: "カート", icon: <ShoppingCartIcon />, link: "/cart" },
  {
    text: "注文履歴",
    icon: <HistoryIcon />,
    link: "/orderhistory",
  },
];
const adminMenu: SideNavMenuType[] = [
  ...userMenu,
  {
    text: "管理画面",
    icon: <AdminIcon />,
    link: "/admin/users",
  },
];

const Sidenav: FC = () => {
  const toggleState = useAppSelector(selectSidenav);
  const dispatch = useAppDispatch();
  const uid = useAppSelector(selectUid);
  const [menus, setMenus] = useState(menu);

  useEffect(() => {
    if (uid === ADMIN_ID) {
      setMenus(adminMenu);
    } else if (uid !== null) {
      setMenus(userMenu);
    } else {
      setMenus(menu);
    }
  }, [uid]);
  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={toggleState}
        onClose={() => {
          dispatch(toggle(false));
        }}
      >
        {toggleState && <SideNavContent menus={menus} uid={uid} />}
      </Drawer>
    </React.Fragment>
  );
};

interface Props {
  menus: SideNavMenuType[];
  uid: string | undefined;
}

export const SideNavContent: FC<Props> = ({ menus, uid }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const link = (link: string) => {
    dispatch(toggle(false));
    router.push(link);
  };
  return (
    <div className={classes.list}>
      <List>
        {uid ? (
          <ListItem
            button
            onClick={() => {
              logout_from_firebase();
            }}
          >
            <ListItemIcon>
              <MeetingRoomOutlined />
            </ListItemIcon>
            <ListItemText primary={"ログアウト"}></ListItemText>
          </ListItem>
        ) : (
          <ListItem
            button
            onClick={() => {
              link("/login");
            }}
          >
            <ListItemIcon>
              <MeetingRoom />
            </ListItemIcon>
            <ListItemText primary={"ログイン"}></ListItemText>
          </ListItem>
        )}
      </List>
      <Divider />
      <List>
        {menus.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => {
              link(item.link);
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text}></ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidenav;
