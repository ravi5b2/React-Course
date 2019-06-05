import React from "react";
import { cleanup, render } from "react-testing-library";
import CourseForm from "./CourseForm";

afterEach(cleanup);

function Wrapper(args) {
  let defaultProps = {
    course: {},
    authors: [],
    onSave: () => {},
    onChange: () => {},
    saving: false,
    errors: {}
  };
  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

it("Should render Add Course", () => {
  const { getByText } = Wrapper();
  getByText("Add Course");
});
