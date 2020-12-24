import React from "react";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkout from "./Checkout";
import { addOneMore, deleteItem } from "../../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  gridContainer: {
    marginTop: "15px",
  },
  text: {
    fontWeight: "700",
    fontSize: "16px",
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "relative",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  counter: {
    position: "relative",
    width: "fit-content",
    padding: "4px 12px 4px 12px",
    zIndex: "1",
    top: "20px",
    backgroundColor: "#f50057",
    boxShadow: "0 0 10px gray",
    color: "white",
    borderRadius: "50%",
  },
}));
// _.find(users, { 'age': 1, 'active': true });
function Cart() {
  const dispatch = useDispatch();
  const isDollars = useSelector((state) => state.menu.isDollars);
  const user = useSelector((state) => state.users?.id);
  const menu = useSelector((state) => state.menu.items);
  const cart = useSelector((state) =>
    state.menu.myCart
      .filter((item) => user === item.userId)
      .map((item) => {
        return {
          ...item,
          details: menu.find((menu) => menu.id === item.menuId),
        };
      })
  );

  const classes = useStyles();

  const total = cart.reduce((acc, item) => {
    return isDollars
      ? acc + item.details.priceEuros + 5
      : acc + item.details.priceDollars + 5;
  }, 0);

  return (
    <Grid item container>
      <Grid item xs={12}>
        <h1>Cart</h1>
      </Grid>
      <Grid item container justify="space-between">
        <Grid item xs={6}>
          <h3>Fee: 5{isDollars ? "$" : "€"}</h3>
        </Grid>
        <Grid item container justify="flex-end" xs={6}>
          <Checkout cart={cart} total={total} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <h3>Total: {total}</h3>
      </Grid>
      <Grid item container justify="center" xs={12}>
        {cart.map((item) => {
          return (
            <Grid key={item.id} item xs={12} sm={6}>
              {/*<Grid container justify="flex-end" item xs={12}>*/}
              <div className={classes.counter}>{item.amount}</div>
              {/*</Grid>*/}
              <Card key={item.id} className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={item.details.src}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.details.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {item.details.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Grid container justify="space-between">
                    <Grid item xs={2}>
                      <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                          <DeleteIcon
                            onClick={() => {
                              dispatch(deleteItem(item.id));
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={3}>
                      <Tooltip title="Add" aria-label="add">
                        <Fab color="secondary" className={classes.fab}>
                          <AddIcon
                            onClick={() => {
                              dispatch(addOneMore(item.id, item.amount + 1));
                            }}
                          />
                        </Fab>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default Cart;
