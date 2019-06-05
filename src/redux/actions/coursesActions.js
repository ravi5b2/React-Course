import * as types from "./types";
import * as courseApi from "../../api/courseApi";

export function loadCourses() {
  return function(dispatch) {
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch({ type: types.LOAD_COURSES_SUCCESS, courses });
      })
      .catch(error => {
        throw error;
      });
  };
}

export function addCourse(course) {
  return function(dispatch) {
    return courseApi
      .saveCourse(course)
      .then(data => {
        course.id
          ? dispatch({ type: types.UPDATE_COURSE_SUCCESS, course: data })
          : dispatch({ type: types.CREATE_COURSE_SUCCESS, course: data });
      })
      .catch(error => {
        throw error;
      });
  };
}

export function deleteCourse(course) {
  return function(dispatch) {
    dispatch({ type: types.DELETE_COURSE, course });
    return courseApi.deleteCourse(course.id).catch(error => {
      throw error;
    });
  };
}
