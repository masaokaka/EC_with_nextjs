import { Container, Paper } from "@material-ui/core";
import { FC } from "react";
import classes from "../../styles/atoms/Inner.module.css";

const Inner: FC = (props) => {
  return (
    <Container className={classes.wrapper}>
      <Paper component="div" variant="outlined" className={classes.paper}>
        {props.children}
      </Paper>
    </Container>
  );
};

export default Inner;
