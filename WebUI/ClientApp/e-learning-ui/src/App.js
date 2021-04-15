import './App.css';
import Header from "./components/layout/Header";
import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Courses from "./components/courses/Courses";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Course from "./components/courses/Course";
import axios from "axios";
import Admin from "./components/admin/Admin";
import CreateCourse from "./components/courses/CreateCourse";
import CreateLesson from "./components/lessons/CreateLesson";
import EditCourse from "./components/courses/EditCourse";
import EditLesson from "./components/lessons/EditLesson";
import CoursesState from "./context/courses/CoursesState";
import LessonsState from "./context/lessons/LessonsState";


function App() {

   /* const [course, setCourse] = useState({});*/
    const [lessons, setLessons] = useState([]);
    const [lesson, setLesson] = useState({});

  /*  const getCourse = async (id) => {
        const res = await axios.get(`https://localhost:44367/api/courses/${id}`);
        setCourse({
            id: res.data.id,
            description: res.data.description,
            price: res.data.price,
            title: res.data.title
        })
        setLessons(res.data.lessons);
    }*/

    const getLesson = async (id) => {
        const res = await axios.get(`https://localhost:44367/api/lesson/${id}`);
        setLesson(res.data);
    }

    const postCourse = async (course) => {
        const res = await axios.post('https://localhost:44367/api/courses', course)
       // setCourses(res.data);
    }

    const postLesson = async (lesson) => {
        const res = await axios.post(`https://localhost:44367/api/lesson`, lesson);
        setLessons(res.data);
    }

    const deleteCourse = async (id) => {
        const res = await axios.delete(`https://localhost:44367/api/courses/${id}`)
       // setCourses(res.data);
    }

    const deleteLesson = async (id) => {
        const res = await axios.delete(`https://localhost:44367/api/lesson/${id}`)
        setLessons(res.data)
    }


    const updateCourse = async (id, course) => {
        const res = await axios.put(`https://localhost:44367/api/courses/${id}`, course)
        //setCourses(res.data);
    }

    const updateLesson = async (id, lesson) => {
        const res = await axios.put(`https://localhost:44367/api/lesson/${id}`, lesson)
        setLessons(res.data)
    }

        return (
            <CoursesState>
                <LessonsState>
                    <Router>
                        <Header/>
                        <Container>
                            <Switch>
                                <Route
                                    path="/"
                                    exact render={props => (
                                    <Courses
                                        {...props}
                                        deleteCourse={deleteCourse}
                                    />
                                )}/>
                                <Route
                                    path="/course/:courseId"
                                    render={props => (
                                        <Course
                                            {...props}
                                            getLesson={getLesson}
                                            deleteLesson={deleteLesson}
                                            lessons={lessons}
                                            lesson={lesson}
                                        />
                                    )}
                                />
                                <Route
                                    exact
                                    path="/admin"
                                    component={Admin}
                                />
                                <Route
                                    exact
                                    path="/admin/course/create"
                                    render={props => (
                                        <CreateCourse
                                            {...props}
                                            postCourse={postCourse}
                                        />
                                    )}
                                />
                                <Route
                                    exact
                                    path="/admin/course/:courseId/edit"
                                    render={props => (
                                        <EditCourse
                                            {...props}
                                            deleteLesson={deleteLesson}
                                            updateCourse={updateCourse}
                                            lessons={lessons}
                                            lesson={lesson}
                                        />
                                    )}
                                />
                                <Route
                                    exact
                                    path="/admin/lesson/:lessonId/edit"
                                    render={props => (
                                        <EditLesson
                                            {...props}
                                            getLesson={getLesson}
                                            deleteLesson={deleteLesson}
                                            updateLesson={updateLesson}
                                            lesson={lesson}
                                        />
                                    )}
                                />
                                <Route
                                    exact
                                    path="/admin/lesson/create"
                                    render={props => (
                                        <CreateLesson
                                            {...props}
                                            postLesson={postLesson}
                                        />
                                    )}
                                />
                            </Switch>
                        </Container>
                    </Router>
                </LessonsState>
            </CoursesState>
        );

}

export default App;
