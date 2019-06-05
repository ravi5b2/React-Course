import * as types from "./types";
import * as authorsApi from "../../api/authorApi";

export function loadAuthors() {
  return function(dispatch) {
    return authorsApi
      .getAuthors()
      .then(authors => {
        dispatch({ type: types.LOAD_AUTHORS_SUCCESS, authors });
      })
      .catch(error => {
        throw error;
      });
  };
}
