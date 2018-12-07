import $ from "jquery";
import { FETCH_CASES, UPDATE_CASE, UPLOAD_CASE } from "./types";

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchCases = cb => async dispatch => {
  try {
    const response = await $.ajax({
      method: "GET",
      url: `${apiUrl}/cases`,
      dataType: "json"
    });

    dispatch({ type: FETCH_CASES, payload: response });
    cb(false, null);
  } catch (err) {
    console.log(err);
    cb(true, "Could not fetch cases");
  }
};
