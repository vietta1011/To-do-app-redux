import { legacy_createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./root-reducer";
import { todos } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = legacy_createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(todos);

export default store;
