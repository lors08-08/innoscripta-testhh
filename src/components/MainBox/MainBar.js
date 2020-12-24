import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Grid from "@material-ui/core/Grid";
import { NavLink } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrency, logOut, startLogIn } from "../../redux/actions";
import PopUpSignUp from "./PopUpSignUp";
import Switch from "@material-ui/core/Switch";

const styles = {
  root: {
    display: "flex",
  },
  currency: {
    fontSize: "24px",
    fontWeight: "700",
  },
  link: {
    color: "#ffffff",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
  menuButton: {
    color: "#ffffff",
    borderRadius: "0",
    "&:focus": {
      border: "none",
      outline: "none",
    },
  },
  loginButton: {
    flex: "1",
    textAlign: "right",
    "&:focus": {
      border: "none",
      outline: "none",
    },
  },
  userName: {
    marginRight: "10px",
  },
  error: {
    marginLeft: "30px",
    color: "red",
  },
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff9800",
      contrastText: "#ffffff",
    },
  },
});
function MainBar(props) {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.users.error);
  const isLogged = useSelector((state) => state.users.isLogged);
  const user = useSelector((state) => state.users.name);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { classes } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogIn = () => {
    if (login.length && password.length >= 5) {
      dispatch(startLogIn(login, password));
    }
  };
  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const [state, setState] = React.useState(false);
  const handleChange = () => {
    setState(!state);
    dispatch(changeCurrency(!state));
  };

  return (
    <Grid item xs={12}>
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <AppBar color="primary" position="static">
            <Toolbar>
              <NavLink className={classes.link} to="/" exact>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                >
                  <MenuIcon />
                  Menu
                </IconButton>
              </NavLink>
              <div className={classes.currency}>€</div>
              <Switch
                onClick={handleChange}
                value={state}
                color="default"
                inputProps={{ "aria-label": "checkbox with default color" }}
              />
              <div className={classes.currency}>$</div>
              <div className={classes.loginButton}>
                <NavLink className={classes.link} to="/cart" exact>
                  <IconButton
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="Menu"
                  >
                    {isLogged && (
                      <div className={classes.userName}>Hi,{user}</div>
                    )}
                    <ShoppingCartOutlinedIcon />
                    <Typography
                      variant="h6"
                      color="inherit"
                      className={classes.grow}
                    >
                      Cart
                    </Typography>
                  </IconButton>
                </NavLink>
                {isLogged ? (
                  <Button
                    className={classes.menuButton}
                    variant="outlined"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <PopUpSignUp handleLogin={handleLogIn} />
                    <Button
                      className={classes.menuButton}
                      variant="outlined"
                      onClick={handleClickOpen}
                    >
                      Login
                    </Button>
                  </>
                )}

                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      To subscribe to this website, please enter your email
                      address here. We will send updates occasionally.
                    </DialogContentText>
                    <TextField
                      placeholder={"type your login"}
                      value={login}
                      onChange={handleChangeLogin}
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Email Address"
                      type="email"
                      fullWidth
                    />
                    <TextField
                      placeholder={"type your password"}
                      value={password}
                      onChange={handleChangePassword}
                      autoFocus
                      margin="dense"
                      id="pass"
                      label="Password"
                      type="password"
                      fullWidth
                    />
                  </DialogContent>
                  {error && (
                    <div className={classes.error}>
                      invalid password or login
                    </div>
                  )}
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleLogIn} color="primary">
                      login
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </div>
    </Grid>
  );
}

MainBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainBar);
