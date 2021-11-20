import React, {useContext, useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {navigate, useParams} from "@reach/router";
import CoursesContext from "../../context/courses/coursesContext";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import CourseItem from "../../components/courses/CourseItem";
import Typography from "@material-ui/core/Typography";
import LessonsContext from "../../context/lessons/lessonsContext";

export default function LessonsForm() {
    const {courseId, lessonId} = useParams();

    const coursesContext = useContext(CoursesContext);
    const {getCourse, course, updateCourse} = coursesContext;

    const lessonsContext = useContext(LessonsContext);
    const {postLesson} = lessonsContext;

    const [editMode, setEditMode] = useState(false);

    const [lesson, setLesson] = useState({
        title: '',
        description: '',
        videoUrl: '',
        courseId: parseInt(courseId),
        isDemo: false
    });

    const {title, description, videoUrl, isDemo} = lesson;


    useEffect(() => {
        getCourse(courseId);

        console.log('lessons id: ', lessonId)
        if (lessonId) {
            setEditMode(true);
        } else {
            setEditMode(false);
        }

        console.log('edit mode: ', editMode);
        // eslint-disable-next-line
    }, [lessonId]);

    const onChange = e =>
        setLesson({...lesson, [e.target.name]: e.target.value});

    const onChangeCheckbox = () => setLesson({...lesson, isDemo: !isDemo});

    const onSubmit = e => {
        e.preventDefault();

        postLesson(lesson)
            .then(() => {
                navigate(`/course/${courseId}`);
            });
    };

    return (
        <>
            <Grid container spacing={4}>
                <Grid item lg={6} xs={12} className="all-center">
                    <Typography component="h1" variant="h5" className="mb-2">
                        Course:
                    </Typography>
                    <CourseItem
                        className="w-100 mt-1"
                        showAddToCartButton={false}
                        course={course}
                        key={course.id}/>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <form onSubmit={onSubmit}>
                        <input
                            type='text'
                            placeholder='Title'
                            name='title'
                            className="w-100"
                            value={title}
                            onChange={onChange}
                        />
                        <textarea
                            placeholder='Description'
                            name='description'
                            className="w-100"
                            value={description}
                            onChange={onChange}
                        />
                        <input
                            type='text'
                            placeholder='Video Url'
                            name='videoUrl'
                            className="w-100"
                            value={videoUrl}
                            onChange={onChange}
                        />
                        <FormGroup className="mb-2">
                            <FormControlLabel control={
                                <Checkbox
                                    checked={isDemo}
                                    onChange={onChangeCheckbox}
                                />} label="Check if this is demo lesson"/>
                        </FormGroup>
                        <Button color="secondary"
                                variant="contained" className="w-100" type="submit">
                            Create
                        </Button>
                    </form>
                </Grid>
            </Grid>

        </>
    )
}
