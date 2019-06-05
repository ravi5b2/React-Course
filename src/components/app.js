import React from "react";
import HomePage from "./home/homePage";
import AboutPage from "./about/aboutPage";
import { Route, Switch } from "react-router-dom";
import Header from "./common/header";
import PageNotFound from "./pagenotfound";
import Courses from "./courses/courses";
import MangeCoursePage from "./courses/ManageCoursePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/courses" component={Courses} />
        <Route path="/about" component={AboutPage} />
        <Route path="/course/:slug" component={MangeCoursePage} />
        <Route path="/course" component={MangeCoursePage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={2000} hideProgressBar />
    </div>
  );
}

export default App;
