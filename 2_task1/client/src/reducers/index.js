import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import caseReducer from "./caseReducer";

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  cases: caseReducer
});

export default rootReducer;
