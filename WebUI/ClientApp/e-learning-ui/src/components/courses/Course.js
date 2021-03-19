import React, {Fragment, Component} from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import Lessons from "../lessons/Lessons";

class Course extends Component {
    componentDidMount() {
        this.props.getCourse(this.props.match.params.id);
    }

    static propTypes = {
        course: PropTypes.object.isRequired,
        lessons: PropTypes.array.isRequired,
        getCourse: PropTypes.func.isRequired
    };

    render() {
        const {title} = this.props.course;
        return (
            <Fragment>
                 <Typography variant="h5" component="h2">
                    Course {title}
                </Typography>
                <Lessons lessons={this.props.lessons}/>
            </Fragment>
        )

    }


}


export default Course;
