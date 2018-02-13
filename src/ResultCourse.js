import React from 'react';

class ResultCourse extends React.Component {
    constructor() {
        super();
        this.state = {
            height: 0
        }
    }
    componentWillMount() {
        this.setState({height: 400});
    }
    addCourse(timeString, courseCode) {
        this.props.addCourse(timeString,courseCode);
    }
    listResults() {
        let height = 0;
        let matchedDeps = this.props.results;
        let allCourses = this.props.all;
        var depArray = allCourses[matchedDeps];
        if(matchedDeps.length !== 0) {
            var displayArray = depArray.map((course) => {
                return (
                    <tr>
                    <td>{course.code}</td>
                    <td>{course.name}</td>
                    <td>{course.credits}</td>
                    <td>{course.ects}</td>
                    <td>{course.instructor}</td>
                    <td>{course.time}</td>
                    <td><button onClick={this.addCourse.bind(this,course.time,course.code)}>Add</button></td>
                    </tr>
                );
            })
            return displayArray;
        }
        else {
            return (
                <tr>
                <td>Type</td>
                </tr>
            );
        }
    }
    render() {
        if (this.props.results.length !== 0) {
            var sty = {height: 400, overflowY:'scroll', overflowX:'hidden'}
        }
        else {
            var sty = {display: 'none'}
        }
        return (
            <div className='courseScroll' style={sty}>
                <table>
                <tbody>
                    {this.listResults()}
                </tbody>
                </table>
            </div>
        );
    }
}

export default ResultCourse;