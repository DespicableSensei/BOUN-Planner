import React from "react";
import { Paper } from "material-ui";
import CourseCard from '../Components/CourseCard'

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
                return(
                    <CourseCard titleMan={course} removeCourse={this.removeCourse.bind(this, {course})} />
                );
                // return(
                //     <Paper style={this.state.paperStyle} >{course}<button onClick={this.removeCourse.bind(this, {course})}>Remove</button></Paper>
                // );
                // return (
                //     <tr key={Math.random()}>
                //     <td>{course}</td>
                //     <td><button onClick={this.removeCourse.bind(this, {course})}>Remove</button></td>
                //     </tr>
                // );
            })
            return displayArray;
        }
        else {
            return(
                <Paper style={this.state.paperStyle} >You haven't added any courses yet.</Paper>
            );
            // return (
            //     <tr>
            //     <td>You haven't added any courses yet.</td>
            //     </tr>
            // );
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
                    {/* <CourseCard /> */}
                    {this.listCourses()}
            </div>
        );
    }
}

export default AddedCourses;