import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  dataReducer,
  contributorReducer,
  totalChangesReducer,
} from "./reducers";
import rootSaga from "./sagas";

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
  data: dataReducer,
  contributors: contributorReducer,
  totalChanges: totalChangesReducer,
});

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
