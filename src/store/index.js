import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import axios from "axios";

const SET_NOTES = "SET_NOTES";
const ADD_NOTE = "ADD_NOTE";
const DELETE_NOTE = "DELETE_NOTE";

const notes = (state = [], action) => {
  switch (action.type) {
    case SET_NOTES:
      return action.notes;
    case ADD_NOTE:
      return [...state, action.note];
    case DELETE_NOTE:
      return state.filter((note) => note.id !== action.id);
    default:
      return state;
  }
};

const auth = (state = {}, action) => {
  if (action.type === "SET_AUTH") {
    return action.auth;
  }
  return state;
};

const logout = () => {
  window.localStorage.removeItem("token");
  return {
    type: "SET_AUTH",
    auth: {},
  };
};

const signIn = (credentials) => {
  return async (dispatch) => {
    let response = await axios.post("/api/auth", credentials);
    const { token } = response.data;
    window.localStorage.setItem("token", token);
    return dispatch(attemptLogin());
  };
};

const attemptLogin = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "SET_AUTH", auth: response.data });
      return true;
    }
  };
};

const getNotes_ = (notes) => {
  return {
    type: SET_NOTES,
    notes,
  };
};

const getNotes = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/notes", {
        headers: {
          authorization: token,
        },
      });
      dispatch(getNotes_(response.data));
    }
  };
};

const addNote_ = (note) => {
  return {
    type: ADD_NOTE,
    note,
  };
};

const addNote = (note) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.post("/api/notes", note, {
        headers: {
          authorization: token,
        },
      });
      dispatch(addNote_(response.data));
    }
  };
};

const deleteNote_ = (id) => {
  return {
    type: DELETE_NOTE,
    id,
  };
};

const deleteNote = (id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.delete(`/api/notes/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(deleteNote_(id));
    }
  };
};

const store = createStore(
  combineReducers({
    auth,
    notes,
  }),
  applyMiddleware(thunk, logger)
);

export { attemptLogin, signIn, logout, getNotes, addNote, deleteNote };

export default store;
