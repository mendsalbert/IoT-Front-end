import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import authReducer from "./store/reducers/authReducer";

const rootReducers = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducers, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
