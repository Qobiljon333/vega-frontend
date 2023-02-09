import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom"

import './App.css';
import Home from './router/home/Home';
import Navbar from './components/navbar/Navbar';
import Buttom from './components/buttom/Buttom';
import CreateAdmin from './components/create-admin/CreateAdmin';
import Login from './router/login/Login';
import CreateTeacher from './components/create-teacher/CreateTeacher';
import CreateStudent from './components/create-student/CreateStudent';
import LoginTeacher from './router/login/LoginTeacher';
import LoginStudent from './router/login/LoginStudent';
import CreateLesson from './components/create-lesson/CreateLesson';

// Private Routes
import PrivateAdmin from './router/private/PrivateAdmin';
import PrivateTeacher from './router/private/PrivateTeacher'
import PrivateStudent from './router/private/PrivateStudent'

import Admin from "./router/admin/Admin"
import Teacher from './router/teacher/Teacher';
import Student from './router/student/Student'
import LessonsWrapper from './components/edit-lesson/LessonsWrapper';
import AddLesson from './components/edit-lesson/AddLesson';
import StudentSingleP from './router/single-pages/students-single-page/StudentSingleP';
import LessonSingleP from './router/single-pages/Lessons-single-page/LessonSingleP';
import SeeMoreLessons from './router/see-more/SeeMoreLessons';
import SeeMoreTeachers from './router/see-more/SeeMoreTeachers';
import TeacherSingleP from './router/single-pages/teachers-single-page/TeacherSingleP';
import AddAnnouncement from './components/announcement/AddAnnouncement';
import Find from './components/find/Find';
import BottomController from './components/bottom-controller/BottomController';
import LoginsContainer from './router/login/LoginsContainer';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        {/* <CreateTeacher /> */}
        {/* <CreateAdmin /> */}
        {/* <CreateStudent /> */}
        {/* <CreateLesson /> */}
        {/* <LessonsWrapper /> */}
        {/* <SeeMoreLessons /> */}
        {/* <SeeMoreTeachers /> */}
        {/* <AddAnnouncement id={""} /> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/all-lessons" component={SeeMoreLessons} />
            <Route exact path="/all-teachers" component={SeeMoreTeachers} />
            <Route exact path="/login-container" component={LoginsContainer} />
            <Route exact path="/create-student" component={CreateStudent} />
            <Route exact path="/login-student" component={LoginStudent} />
            <Route exact path="/login-teacher" component={LoginTeacher} />
            <Route exact path="/login" component={Login} />
            <Route path="/find" component={Find} />
            
            <Route exact path="/teacher/add-lesson/:id" component={AddLesson} />
            <Route exact path="/student-single-page/:id" component={StudentSingleP} />
            <Route exact path="/lesson-single-page/:id" component={LessonSingleP} />
            <Route exact path="/teacher-single-page/:id" component={TeacherSingleP} />

            {/* <Route exact path="/thema-single-page/:id" component={} /> */}
            <PrivateStudent  path="/student">
              <Student />
            </PrivateStudent>
            <PrivateTeacher path="/teacher" >
              <Teacher />
            </PrivateTeacher>

            <PrivateAdmin  path="/admin">
              <Admin />
            </PrivateAdmin>
          </Switch>

          <Buttom />
          <BottomController />
      </Router>
    </div>
  );
}

export default App;
