const localData = JSON.parse(localStorage.getItem("auth"));
console.log(localData);
const initialState = {
  // id
  // isLogged: true
  // login: "admin"
  // name: "joe"
  // password: "admin"
  ...localData,
  authorizing: false,
  error: false,
};

function users(state = initialState, action) {
  switch (action.type) {
    case "users/logIn/start":
      return {
        ...state,
        authorizing: true,
        error: false,
      };
    case "users/logIn/succeed":
      return {
        ...state,
        ...action.payload[0],
        authorizing: false,
      };
    case "menu/signup/start":
      return {
        ...state,
        authorizing: true,
      };
    case "menu/signup/succeed":
      return {
        ...state,
        authorizing: false,
      };
    case "users/logIn/failed":
      return {
        ...state,
        authorizing: false,
        error: true,
      };
    case "users/logOut":
      return {
        ...state,
        id: null,
        isLogged: false,
        login: undefined,
        name: undefined,
        password: undefined,
      };

    default:
      return state;
  }
}

export default users;
