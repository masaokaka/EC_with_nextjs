import { FC } from "react";
import { Divider, Grid } from "@material-ui/core";
import { Btn } from "../../atoms";
import { useRouter } from "next/router";

const AdminHeaderBtns: FC = () => {
  const router = useRouter();
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item style={{ margin: "10px 5px" }}>
          <Btn
            text="ユーザー情報"
            color="#fff"
            bgcolor="orange"
            onClick={() => router.push("/admin/users")}
          />
        </Grid>
        <Grid item style={{ margin: "10px 5px" }}>
          <Btn
            text="商品情報"
            color="#fff"
            bgcolor="orange"
            onClick={() => router.push("/admin/items")}
          />
        </Grid>
        <Grid item style={{ margin: "10px 5px" }}>
          <Btn
            text="トッピング情報"
            color="#fff"
            bgcolor="orange"
            onClick={() => router.push("/admin/toppings")}
          />
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default AdminHeaderBtns;
