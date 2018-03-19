import React from 'react';
import { Paper } from "material-ui";

class Counters extends React.Component {
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
            <div style={{marginBottom:20}} >
                <Paper style={this.state.paperStyle} >Conflicts: {this.props.conflicts.length}</Paper>
                <Paper style={this.state.paperStyle} >Credits: {this.countCredits()}</Paper>
            </div>
        );
    }
}

export default Counters;