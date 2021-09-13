import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, createStore } from "redux";
import { userWatcher } from "./sagas/user";
import { reducer } from "./reducers/user";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(userWatcher);

export default store;
