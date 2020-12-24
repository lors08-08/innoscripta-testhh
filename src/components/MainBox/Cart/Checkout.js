import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  info: {
    marginTop: "15px",
  },
  text: {
    fontWeight: "700",
  },
  textField: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "40ch",
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff9800",
      contrastText: "#ffffff",
    },
  },
});
function Checkout(props) {
  const isDollars = useSelector((state) => state.menu.isDollars);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          Checkout
        </Button>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Your cart
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                Confirm Order
              </Button>
            </Toolbar>
          </AppBar>
          <Grid className={classes.info} container>
            <Grid item xs={false} sm={3} />
            <Grid
              direction="column"
              spacing={4}
              className={classes.textField}
              alignItems="center"
              item
              container
              xs={12}
              sm={6}
            >
              <Grid item xs={12}>
                <TextField
                  required
                  id="outlined-required-1"
                  label="Name"
                  variant="outlined"
                  defaultValue=""
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="outlined-required-2"
                  label="Email"
                  variant="outlined"
                  defaultValue=""
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="outlined-required-3"
                  label="Phone"
                  variant="outlined"
                  defaultValue=""
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="outlined-required-4"
                  label="Address"
                  variant="outlined"
                  defaultValue=""
                />
              </Grid>
              <Grid item container justify="center" xs={12}>
                <h1>Order Details</h1>
              </Grid>
              <Grid
                item
                container
                spacing={5}
                alignItems="center"
                justify="space-between"
              >
                <Grid
                  className={classes.text}
                  justify="flex-end"
                  item
                  container
                  xs={6}
                >
                  name
                </Grid>
                <Grid item xs={6}>
                  {props.cart.map((item) => {
                    return (
                      <div>
                        Your pizza {item.details.name} x{item.amount}{" "}
                      </div>
                    );
                  })}
                </Grid>
                <Grid
                  className={classes.text}
                  justify="flex-end"
                  item
                  container
                  xs={6}
                >
                  Delivery Fee
                </Grid>
                <Grid item xs={6}>
                  5{isDollars ? "$" : "€"}
                </Grid>
                <Grid
                  className={classes.text}
                  justify="flex-end"
                  item
                  container
                  xs={6}
                >
                  Total
                </Grid>
                <Grid item xs={6}>
                  {props.total} {isDollars ? "$" : "€"}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={false} sm={3} />
          </Grid>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}

export default Checkout;
