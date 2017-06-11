import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import appReducer from "./containers/App/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};
const store = configureStore(initialState);

function configureStore(initialState) {
    return createStore(
        combineReducers({
            appReducer
        }),
        initialState,
        composeEnhancers()
    );
}

export default store;