const initialState = {
  loading: false,
  items: [],
  myCart: [],
  loadingCart: false,
  isDollars: false,
};

function menu(state = initialState, action) {
  switch (action.type) {
    case "menu/load/start":
      return {
        ...state,
        loading: true,
      };
    case "menu/load/succeed":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "menu/loadCart/start":
      return {
        ...state,
        loadingCart: true,
      };
    case "menu/loadCart/succeed":
      return {
        ...state,
        loadingCart: false,
        myCart: action.payload,
      };
    case "menu/order/start":
      return {
        ...state,
      };
    case "menu/order/succeed":
      return {
        ...state,
        myCart: [...state.myCart, action.payload],
      };
    case "menu/orderMore/start":
      return {
        ...state,
      };
    case "menu/orderMore/succeed":
      return {
        ...state,
        myCart: action.payload,
      };
    case "menu/currency/change":
      return {
        ...state,
        isDollars: action.payload,
      };
    case "menu/delete/start":
      return {
        ...state,
      };
    case "menu/delete/succeed":
      return {
        ...state,
        myCart: state.myCart.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              amount: action.payload.amount,
            };
          }
          return item;
        }),
        // myCart: state.myCart.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
}

export default menu;
