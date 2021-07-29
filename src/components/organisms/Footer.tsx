import { FC } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// import MediaQuery from "react-responsive";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      backgroundColor: "orange",
      color: "#fff",
      position: "fixed",
      bottom: "0",
      width: "100%",
      left: "0",
    },
    flexContainerColum: {
      display: "flex",
      flexDirection: "column-reverse",
      justifyContent: "space-between",
      alignItems: "center",
    },
    margin: {
      margin: "10px",
    },
  })
);

const Footer: FC = () => {
  const classes = useStyles();
  return (
    // <MediaQuery query="(min-height: 400px)">
      <footer id="footer" className={classes.footer}>
        <div className={classes.flexContainerColum}>
          <div className={classes.margin}>
            <Typography variant="subtitle1">
              &copy;{new Date().getFullYear()}M.T{"."}
            </Typography>
          </div>
        </div>
      </footer>
    // </MediaQuery>
  );
};

export default Footer;
