import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { IconBtn, Logo } from "../atoms";
import { HeadIconBtns } from "../molecules";
import { toggle } from "../../features/sidenavSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectUserInfo,
  selectUid,
} from "../../features/userinfo/userinfoSlice";
import { FC } from "react";
// import MediaQuery from "react-responsive";

const useStyles = makeStyles((theme: Theme) => ({
  grow: {
    flexGrow: 1,
  },
  header: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    left: "0",
  },
  appbar: {
    padding: theme.spacing(1, 1),
    backgroundColor: "orange",
    height: "100",
  },
}));

const Header: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const uid = useAppSelector(selectUid);
  return (
    <header className={classes.header}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <Grid container alignItems="center" style={{ flexWrap: "nowrap" }}>
            <Grid item>
              <Logo />
            </Grid>
            <div className={classes.grow} />
            {userInfo && (
              <Grid item>
                {userInfo.username && (
                  <div>
                    ようこそ&nbsp;<strong>{userInfo.username}</strong>
                    &nbsp;さん
                  </div>
                )}
              </Grid>
            )}
            <Grid item>
              <HeadIconBtns uid={uid} />
            </Grid>
            {/* 画面幅600px以下の場合 */}
            {/* <div className={classes.grow} />
              {userInfo && (
                <Grid item style={{ fontSize: "13px" }}>
                  {userInfo.username && <div>{userInfo.username}</div>}
                </Grid>
              )}
              <div className={classes.grow} />
              <Grid item>
                <IconBtn
                  icon={"Menu"}
                  onClick={() => dispatch(toggle(true))}
                ></IconBtn>
              </Grid> */}
          </Grid>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
