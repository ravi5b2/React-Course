import * as types from "../actions/types";
import initialState from "../reducers/initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      return state.map(course =>
        course.id === action.course.id ? action.course : course
      );
    case types.LOAD_COURSES_SUCCESS:
      return [...state, ...action.courses];

    case types.DELETE_COURSE:
      return state.filter(course => course.id !== action.course.id);
    default:
      return state;
  }
}
