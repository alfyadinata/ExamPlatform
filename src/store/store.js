import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import * as reducers from "./reducers";
import { interceptResponse } from "../utils/axios";

const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const composeEnhancers = (typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const rootReducer = combineReducers(reducers);
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

interceptResponse(store.dispatch, store.getState);

export default store;
