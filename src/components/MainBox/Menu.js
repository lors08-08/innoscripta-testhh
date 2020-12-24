import React from "react";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/actions";

const useStyles = makeStyles(() => ({
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

function Menu() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.users.isLogged);
  const isDollars = useSelector((state) => state.menu.isDollars);
  const menu = useSelector((state) => state.menu.items);
  const user = useSelector((state) => state.users.id);
  const classes = useStyles();

  const handleOrder = (user, itemId) => {
    if (true) {
      dispatch(addItem(user, itemId, 1));
    }
  };

  return (
    <Grid item container>
      <Grid item xs={12}>
        <Grid className={classes.gridContainer} item container xs={12}>
          {menu.map((item) => {
            return (
              <Grid
                key={item.id}
                className={classes.gridContainer}
                item
                xs={12}
                sm={6}
              >
                <div className={classes.counter}>
                  {isDollars ? item.priceDollars + "$" : item.priceEuros + "€"}
                </div>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={item.src}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {item.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      onClick={() => {
                        handleOrder(user, item.id);
                      }}
                      className={classes.text}
                      size="small"
                      color="primary"
                    >
                      Order
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Menu;
