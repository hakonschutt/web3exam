import {
  FETCH_CASES,
  UPDATE_CASE,
  UPLOAD_CASE,
  UPLOAD_PERSON,
  DELETE_CASE
} from "../actions/types";

export default function(state = [], action) {
  console.log(action);

  switch (action.type) {
    case FETCH_CASES:
      return action.payload;
    case UPDATE_CASE:
      return state.reduce((prev, cur) => {
        if (cur.id === action.metaId) {
          prev.push({
            ...cur,
            ...action.payload,
            id: action.metaId,
            persons: cur.persons
          });
        } else {
          prev.push(cur);
        }

        return prev;
      }, []);
    case UPLOAD_CASE:
      return [action.payload, ...state];
    case UPLOAD_PERSON:
      return state.map(el => {
        if (el.id === action.metaId) {
          el.persons.push(action.payload);
        }

        return el;
      });
    case DELETE_CASE:
      return state.reduce((prev, cur) => {
        if (cur.id !== action.payload) {
          prev.push(cur);
        }

        return prev;
      }, []);
    default:
      return state;
  }
}
