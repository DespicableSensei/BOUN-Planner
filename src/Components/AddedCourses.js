import React from "react";
import { Paper, Menu } from "material-ui";
import CourseCard from '../Components/CourseCard'
import { MenuItem } from "material-ui/Menu";
import ContentBackspace from 'material-ui/svg-icons/content/backspace';

class AddedCourses extends React.Component {
    constructor() {
        super();
        let paperStyle = {
            padding: 10,
            marginBottom: 8,
        }
        this.state = {
            paperStyle: paperStyle
        }
    }
    removeCourse(days, hours, courseCode) {
        this.props.removeCourse(days, hours, courseCode);
    }
    listCourses() {
        let myCourses = this.props.addedCourses;
        
        if(myCourses.length !== 0) {
            var displayArray = myCourses.map((course) => {
                return (
                    <MenuItem primaryText={course} rightIcon={<ContentBackspace/>} onClick={this.removeCourse.bind(this, {course})} />
                );
            })
            return displayArray;
        }
        else {
            return(
                <Paper style={this.state.paperStyle} >You haven't added any courses yet.</Paper>
            );
        }
    }
    render() {
        var sty = {};
        if (this.props.addedCourses.length !== 0) {
            sty = {overflowY:'auto', overflowX:'hidden'}
        }
        else {
            sty = {marginLeft: "auto",marginRight: "auto"}
        }
        return (
            <div>
                    <Paper style={this.state.paperStyle} >Conflict Count: {this.props.conflicts.length}</Paper>
                    {this.listCourses()}
            </div>
        );
    }
}

export default AddedCourses;