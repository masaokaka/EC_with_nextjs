import { ItemType } from "../../store/features/item/itemsSlice";
import { Grid } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { FC } from "react";
import Image from "next/image";

interface Props {
  item: ItemType | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      [theme.breakpoints.up("sm")]: {
        width: "300px",
        height: "200px",
      },
      [theme.breakpoints.down("sm")]: {
        width: "220px",
        height: "140px",
      },
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
  })
);

const ItemDetail: FC<Props> = ({ item }) => {
  const classes = useStyles();
  // console.log(item!.img);
  return (
    <>
      {item !== undefined && (
        <Grid container justifyContent="center" style={{ margin: 10 }}>
          <Grid item sm={6} md={4}>
            <Image
              src={item.img!}
              alt="画像"
              // className={classes.img}
              width={300}
              height={200}
            />
          </Grid>
          <Grid item sm={6} md={6}>
            <Grid container direction="column">
              <Grid item>
                <h3>{item.name}</h3>
              </Grid>
              <Grid item style={{ overflowWrap: "normal" }}>
                {item.text}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ItemDetail;
