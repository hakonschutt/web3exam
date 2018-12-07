import { FETCH_CASES, UPDATE_CASE, UPLOAD_CASE } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CASES:
      return action.payload;
    case UPDATE_CASE:
      return state.reduce((prev, cur) => {
        if (cur.id === action.payload.id) {
          prev.push(action.payload);
        } else {
          prev.push(cur);
        }

        return prev;
      }, []);
    case UPLOAD_CASE:
      return [...action.payload, ...state];
    default:
      return state;
  }
}
