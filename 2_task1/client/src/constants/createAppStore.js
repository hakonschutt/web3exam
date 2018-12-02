import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "../reducers";

const createAppStore = (initialState = {}) => {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(reduxThunk)
  );

  return store;
};

export default createAppStore;
