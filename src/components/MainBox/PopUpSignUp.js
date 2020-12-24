import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import { useDispatch } from "react-redux";
import { signUp, startLogIn } from "../../redux/actions";

const styles = {
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
};

function PopUpSignUp(props, { handleLogin }) {
  const { classes } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePass = (e) => {
    setPass(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSignUp = () => {
    if (name.length && email.length && pass.length > 5) {
      dispatch(signUp(name, email, pass));
      dispatch(startLogIn(email, pass));
      setOpen(false);
    }
  };
  return (
    <>
      <Button
        className={classes.menuButton}
        variant="outlined"
        onClick={handleClickOpen}
      >
        SignUp
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">SignUp</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={name}
            onChange={handleChangeName}
            margin="dense"
            id="name"
            label="name"
            type="name"
            fullWidth
          />
          <TextField
            autoFocus
            value={email}
            onChange={handleChangeEmail}
            margin="dense"
            id="mail"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            value={pass}
            onChange={handleChangePass}
            margin="dense"
            id="pass"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSignUp} color="primary">
            SignUp
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withStyles(styles)(PopUpSignUp);
