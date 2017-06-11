import { createStore, compose } from "redux";
import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore(initialState) {
  return createStore(reducers, initialState, composeEnhancers());
}

export default configureStore({});
