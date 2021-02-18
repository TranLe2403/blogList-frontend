import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import notiReducer from "./reducers/notiReducer";
import thunk from "redux-thunk";
import bloglistReducer from "./reducers/bloglistReducer";
import userReducer from "./reducers/userReducer";
import loginReducer from "./reducers/loginReducer";

const reducer = combineReducers({
  blogs: bloglistReducer,
  notification: notiReducer,
  users: userReducer,
  signedUser: loginReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
