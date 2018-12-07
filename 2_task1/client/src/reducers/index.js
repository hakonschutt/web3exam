import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import caseReducer from "./caseReducer";

const rootReducer = combineReducers({
  form: formReducer,
  cases: caseReducer
});

export default rootReducer;
