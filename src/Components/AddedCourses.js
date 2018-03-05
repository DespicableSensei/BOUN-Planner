import React from "react";
import { Paper } from "material-ui";
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
                    <MenuItem key={course} primaryText={course} rightIcon={<ContentBackspace/>} onClick={this.removeCourse.bind(this, {course})} />
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
        return (
            <div>
                    <Paper style={this.state.paperStyle} >Conflict Count: {this.props.conflicts.length}</Paper>
                    {this.listCourses()}
            </div>
        );
    }
}

export default AddedCourses;