import React from "react";

export function loadMenu() {
  return (dispatch) => {
    dispatch({ type: "menu/load/start" });
    fetch("/menu")
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: "menu/load/succeed",
          payload: json,
        });
      });
  };
}
export function loadCart() {
  return (dispatch) => {
    dispatch({ type: "menu/loadCart/start" });
    fetch("/myCart")
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: "menu/loadCart/succeed",
          payload: json,
        });
      });
  };
}
export function changeCurrency(value) {
  return (dispatch) => {
    dispatch({
      type: "menu/currency/change",
      payload: value,
    });
  };
}
export function logOut() {
  return (dispatch) => {
    localStorage.removeItem("auth");
    dispatch({
      type: "users/logOut",
    });
  };
}

export function startLogIn(login, password) {
  return (dispatch) => {
    dispatch({ type: "users/logIn/start" });

    fetch(`/users?login=${login}&password=${password}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.length) {
          dispatch({
            type: "users/logIn/succeed",
            payload: json,
          });
          localStorage.setItem("auth", JSON.stringify(json[0]));
        } else {
          dispatch({
            type: "users/logIn/failed",
          });
        }
      });
  };
}
export function signUp(name, email, pass) {
  return (dispatch) => {
    dispatch({ type: "menu/signup/start" });
    fetch("/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        login: email,
        password: pass,
        isLogged: true,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: "menu/signup/succeed",
          payload: json,
        });
      });
  };
}

export function addItem(user, menuId, amount) {
  return (dispatch) => {
    dispatch({ type: "menu/order/start" });
    fetch("/myCart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user,
        menuId: menuId,
        amount: amount,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: "menu/order/succeed",
          payload: json,
        });
      });
  };
}

export function addOneMore(id, amount) {
  return (dispatch) => {
    dispatch({ type: "menu/orderMore/start" });
    fetch(`/menu/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: "menu/orderMore/succeed",
          payload: { id, amount },
        });
      });
  };
}

export function deleteItem(id) {
  return (dispatch) => {
    dispatch({ type: "menu/delete/start" });
    fetch(`/myCart/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        dispatch({
          type: "menu/delete/succeed",
          payload: id,
        });
      });
  };
}
