import { FC } from "react";
import { Grid } from "@material-ui/core";

const LoadingPage: FC = () => {
  return (
    <>
      <Grid container alignItems="center" direction="column">
        <Grid item>
          <img
            src={`${process.env.PUBLIC_URL}/img/loading.gif`}
            alt="ローディング"
          />
        </Grid>
        <Grid item>
          <h2>now Loading ....</h2>
        </Grid>
      </Grid>
    </>
  );
};

export default LoadingPage;
