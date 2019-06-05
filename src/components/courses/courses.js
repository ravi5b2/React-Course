import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as coursesAction from "../../redux/actions/coursesActions";
import * as authrosAction from "../../redux/actions/authorsActions";
import { bindActionCreators } from "redux";
import CoursesList from "./coursesList";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class Courses extends React.Component {
  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert("An error occured in Loading Courses" + error);
      });
    }
    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("An error occured in Loading Authors" + error);
      });
    }
  }

  deleteCourse = course => {
    toast.success("Course Deleted");
    this.props.actions.deleteCourse(course).catch(error => {
      toast.error("Error Occured" + error.message);
    });
  };

  render() {
    return (
      <div>
        <div>
          {this.props.courses.length > 0 ? (
            <CoursesList
              courses={this.props.courses}
              authors={this.props.authors}
              deleteCourse={this.deleteCourse}
            />
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    );
  }
}

Courses.propTypes = {
  courses: PropTypes.array.isRequired,
  // deleteCourse: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired
};
function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(
                author => author.id === course.authorId
              ).name
            };
          }),
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: course => dispatch(coursesAction.createCourse(course))
    actions: {
      loadCourses: bindActionCreators(coursesAction.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authrosAction.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(coursesAction.deleteCourse, dispatch)
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses);
