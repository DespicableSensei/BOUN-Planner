import React from "react";

class AddedCourses extends React.Component {
    removeCourse(days, hours, courseCode) {
        this.props.removeCourse(days, hours, courseCode);
    }
    listCourses() {
        let myCourses = this.props.addedCourses;
        if(myCourses.length !== 0) {
            var displayArray = myCourses.map((course) => {
                return (
                    <tr key={Math.random()}>
                    <td>{course}</td>
                    <td><button onClick={this.removeCourse.bind(this, {course})}>Remove</button></td>
                    </tr>
                );
            })
            return displayArray;
        }
        else {
            return (
                <tr>
                <td>You haven't added any courses yet.</td>
                </tr>
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
            <div className='courseScroll' style={sty}>
                <table>
                <tbody>
                    <tr><td>Conflict Count: {this.props.conflicts.length}</td></tr>
                    {this.listCourses()}
                </tbody>
                </table>
            </div>
        );
    }
}

export default AddedCourses;