import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadCourses, addCourse } from "../../redux/actions/coursesActions";
import { loadAuthors } from "../../redux/actions/authorsActions";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  addCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState();
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("An error occured in Loading Courses" + error);
      });
    } else {
      setCourse({ ...props.course });
    }
    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("An error occured in Loading Authors" + error);
      });
    }
  }, [props.course]);

  function validateForm(course) {
    const errors = {};
    if (!course.title) errors.title = "Title is Required";
    if (!course.authorId) errors.author = "Author is Required";
    if (!course.category) errors.category = "Category is Required";
    setErrors(errors);
    return Object.keys(errors).length > 0 ? false : true;
  }
  function saveCourse(event) {
    event.preventDefault();
    if (validateForm(course)) {
      setSaving(true);
      addCourse(course)
        .then(() => {
          toast.success("Course saved.");
          history.push("/courses");
        })
        .catch(error => {
          setSaving(false);
          setErrors({ onSave: error.message });
        });
    }
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevState => ({
      ...prevState,
      [name]: name == "authorId" ? parseInt(value, 10) : value
    }));
  }

  return courses.length > 0 && authors.length > 0 ? (
    <CourseForm
      course={course}
      authors={authors}
      onChange={handleChange}
      errors={errors}
      onSave={saveCourse}
      saving={saving}
    />
  ) : (
    <Spinner />
  );
}

ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  addCourse: PropTypes.func.isRequired
};
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? state.courses.find(course => course.slug === slug) || null
      : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
}
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  addCourse
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
