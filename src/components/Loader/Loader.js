import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff9800",
    },
  },
});

function Loader() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CircularProgress color="primary" />
      </div>
    </ThemeProvider>
  );
}

export default Loader;
