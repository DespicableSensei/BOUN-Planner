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
            marginTop: 8,
        }
        this.state = {
            paperStyle: paperStyle,
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
                    <MenuItem style={{color: randomColor({seed: Math.seed(course)})}} key={course} primaryText={course} rightIcon={<ContentBackspace/>} onClick={this.removeCourse.bind(this, {course})} />
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
                {this.listCourses()}
            </div>
        );
    }
}

export default AddedCourses;