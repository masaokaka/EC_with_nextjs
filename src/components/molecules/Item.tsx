import { FC } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ItemType } from "../../features/item/itemsSlice";
import { Price } from "../atoms";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      [theme.breakpoints.up("sm")]: {
        width: 260,
        height: 280,
        marginTop: 30,
        marginRight: 8,
        marginLeft: 8,
        padding: 10,
      },
      [theme.breakpoints.down("sm")]: {
        width: 180,
        height: 180,
        marginTop: 15,
        marginRight: 2,
        marginLeft: 2,
        padding: 5,
      },
      [theme.breakpoints.down("xs")]: {
        width: 120,
        height: 120,
        marginTop: 15,
        marginRight: 2,
        marginLeft: 2,
        padding: 5,
      },
    },
    cardContent: {
      [theme.breakpoints.up("sm")]: {
        padding: "10px 16px",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "5px 16px",
      },
    },

    media: {
      [theme.breakpoints.up("sm")]: {
        height: 165,
      },
      [theme.breakpoints.down("sm")]: {
        height: 100,
      },
      [theme.breakpoints.down("xs")]: {
        height: 50,
      },
    },
    name: {
      fontWeight: "bold",
      textAlign: "center",
      [theme.breakpoints.up("sm")]: {
        fontSize: 16,
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 9,
      },
    },
    price: {
      textAlign: "center",
      marginButtom: 2,
      [theme.breakpoints.up("sm")]: {
        fontSize: 16,
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 8,
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 5,
      },
    },
  })
);

interface Props {
  item: ItemType;
}

const Item: FC<Props> = ({ item }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => router.push(`/iteminfo/${item._id}`)}>
        <CardMedia
          className={classes.media}
          image={item.img}
          title={item.name}
        />
        <CardContent className={classes.cardContent}>
          <Typography className={classes.name}>{item.name}</Typography>
        </CardContent>
        <CardContent className={classes.cardContent}>
          <Typography variant="body2" component="div">
            <Grid
              container
              direction="column"
              alignContent="center"
              className={classes.price}
            >
              <Grid item>
                <strong>M:&nbsp;&nbsp;</strong>
                <Price price={item.mprice!} bigsize={false} tax={false}></Price>
              </Grid>
              <Grid item>
                <strong>L:&nbsp;&nbsp;</strong>
                <Price price={item.lprice!} bigsize={false} tax={false}></Price>
              </Grid>
            </Grid>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Item;
