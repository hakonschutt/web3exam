import $ from "jquery";
import {
  FETCH_CASES,
  UPDATE_CASE,
  UPLOAD_CASE,
  UPLOAD_PERSON,
  DELETE_CASE
} from "./types";

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

export const updateCase = (id, fields, cb) => async dispatch => {
  try {
    const response = await $.ajax({
      method: "PUT",
      contentType: "application/json",
      url: `${apiUrl}/cases/${id}`,
      dataType: "json",
      data: JSON.stringify(fields)
    });

    dispatch({ type: UPDATE_CASE, payload: response, metaId: id });
    cb(false, null, id);
  } catch (err) {
    cb(true, "Could not update case", null);
  }
};

export const uploadCase = (fields, cb) => async dispatch => {
  try {
    const response = await $.ajax({
      method: "POST",
      contentType: "application/json",
      url: `${apiUrl}/cases`,
      dataType: "json",
      data: JSON.stringify(fields)
    });

    dispatch({ type: UPLOAD_CASE, payload: response });
    cb(false, null, response.id);
  } catch (err) {
    console.log(err);
    cb(true, "Could not upload case", null);
  }
};

export const uploadCasePerson = (id, name, cb) => async dispatch => {
  try {
    await $.ajax({
      method: "POST",
      url: `${apiUrl}/cases/${id}/persons`,
      dataType: "json",
      data: name
    });

    dispatch({ type: UPLOAD_PERSON, payload: name, metaId: id });
    cb(false, null);
  } catch (err) {
    cb(true, "Could not upload case person");
  }
};

export const deleteCase = (id, cb) => async dispatch => {
  try {
    await $.ajax({
      method: "DELETE",
      url: `${apiUrl}/cases/${id}`,
      dataType: "json"
    });

    dispatch({ type: DELETE_CASE, payload: id });
    cb(false, null);
  } catch (err) {
    console.log(err);
    cb(true, "Could not delete case");
  }
};
