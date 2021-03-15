import * as React from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import CourseItem from "./CourseItem";
import {Link} from "react-router-dom";

class Courses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: []
        }

    }

    componentDidMount() {
        axios
            .get('https://localhost:44367/api/courses')
            .then((res) => {
                this.setCourses(res.data);
            })
            .catch((error) => console.error('error:', error));
    }

    setCourses(data) {
        this.setState({
            courses: data
        })
    }

    render() {
        return (
            <div>
                <h3>Courses:</h3>
                <Grid container spacing={1}>

                    {
                        this.state.courses.map((course) =>
                            <Link to={`/course/${course.id}`}  style={{ textDecoration: 'none' }}>
                                <CourseItem key={course.id}
                                            course={course}/>
                            </Link>
                        )
                    }
                </Grid>


            </div>
        )

    }
}


export default Courses;
