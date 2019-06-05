import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CoursesList = ({ courses, deleteCourse }) => (
  <div className="container">
    <h2>Available Courses</h2>
    <Link to="/course">Add Course</Link>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Slug</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {courses.map(course => {
          return (
            <tr key={course.id}>
              <td>
                <a
                  className="btn btn-light"
                  href={"http://pluralsight.com/courses/" + course.slug}
                >
                  Watch
                </a>
              </td>
              <td>
                <Link to={"/course/" + course.slug}>{course.title}</Link>
              </td>
              <td>{course.authorName}</td>
              <td>{course.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    deleteCourse(course);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
CoursesList.propTypes = {
  courses: PropTypes.array.isRequired,
  deleteCourse: PropTypes.func.isRequired
  // actions: PropTypes.object.isRequired
};
export default CoursesList;
