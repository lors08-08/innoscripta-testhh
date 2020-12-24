import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Menu from "./Menu";
import Cart from "./Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { loadCart } from "../../redux/actions";

function Body() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.menu.loadingCart);

  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Menu />
        </Route>
        <Route path="/cart">{loading ? <Loader /> : <Cart />}</Route>
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default Body;
