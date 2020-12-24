import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import MainBar from "./components/MainBox/MainBar";
import { loadMenu } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Loader/Loader";
import { BrowserRouter as Router } from "react-router-dom";
import Body from "./components/MainBox/Body";

function App() {
  const dispatch = useDispatch();
  const loadingMenu = useSelector((state) => state.menu.loading);

  useEffect(() => {
    dispatch(loadMenu());
  }, [dispatch]);

  if (loadingMenu) {
    return <Loader />;
  }
  return (
    <Router>
      <Grid container>
        <MainBar />
        <Grid item container>
          <Grid item xs={false} sm={2} />
          <Grid item xs={12} sm={8}>
            <Body />
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
