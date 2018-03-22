import React from "react";
import { Paper } from "material-ui";
import { MenuItem } from "material-ui/Menu";
import ContentBackspace from 'material-ui/svg-icons/content/backspace';
import randomColor from 'randomcolor';

Math.seed = function(s) {
    //string to number
    var seed = s.split('').map(i => i.charCodeAt()).join('');
    return seed
};

class AddedCourses extends React.Component {
    constructor() {
        super();
        let paperStyle = {
            padding: '8px 16px',
            marginBottom: 8,
        }
        this.state = {
            paperStyle: paperStyle,
            creditCount: 0
        }
    }
    removeCourse(days, hours, courseCode) {
        this.props.removeCourse(days, hours, courseCode);
    }
    listCourses() {
        let myCourses = this.props.courseData;
        
        if(myCourses.length !== 0) {
            var displayArray = myCourses.map((course) => {
                console.log(course["Code_Sec"]);
                return (
                    <MenuItem style={{color: randomColor({seed: Math.seed(course["Code_Sec"])})}} key={course["Code_Sec"]} primaryText={course["Code_Sec"]} rightIcon={<ContentBackspace/>} onClick={this.removeCourse.bind(this, {course})} />
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
    countCredits() {
        let myCourses = this.props.addedCourses;
        let myCourseIndexes = myCourses.map(course => this.props.all.findIndex(val => val["Code_Sec"] === course));
        let myCredits = myCourseIndexes.map(index => {
            var credit = this.props.all[index]["Credits"];
            var creditInt = parseInt(credit,10);
            return creditInt;
        });
        let totalCredits = myCredits.reduce((a,c) => a+c,0);
        return totalCredits
    }
    render() {
        return (
            <div>
                    <Paper style={this.state.paperStyle} >Conflicts: {this.props.conflicts.length}</Paper>
                    <Paper style={this.state.paperStyle} >Credits: {this.countCredits()}</Paper>
                    {this.listCourses()}
            </div>
        );
    }
}

export default AddedCourses;