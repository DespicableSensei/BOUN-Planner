import React from 'react';

class ResultCourse extends React.Component {
    addCourse(days, hours, courseCode) {
        this.props.addCourse(days, hours, courseCode);
    }
    doesThisConflict(days, hours) {
        var arrayOfThisCourse = this.props.getIndex(days, hours);
        var arrayOfCourseIndexes = this.props.courseIndexes;
        // var resultOfCheck = arrayOfThisCourse.map((index) => {
        //     return arrayOfCourseIndexes.indexOf(index);
        // });
        if(arrayOfThisCourse.length !== 0) {
            console.log(days,hours,arrayOfThisCourse,arrayOfCourseIndexes);
            //var resultOfCheck = arrayOfThisCourse.reduce((acc, cur) => acc+cur)
            var resultOfCheck = arrayOfThisCourse.reduce((acc, cur) => {
                var currentConflict = (arrayOfCourseIndexes.indexOf(cur) > -1)?1:0;
                return acc + currentConflict;
            },0);
        }
        if(arrayOfThisCourse.length === 0) {
            resultOfCheck = 0;
        }
        // var resultOfCheck = arrayOfThisCourse.reduce(index => {
        //     return arrayOfCourseIndexes.indexOf(index);
        // });
        console.log(resultOfCheck);
        return resultOfCheck;
    }
    listResults() {
        let matchedDeps = this.props.results;
        if(matchedDeps.length !== 0) {
            var displayArray = matchedDeps.map((course) => {
                return (
                    <tr key={Math.random()}>
                    <td>{course["Code_Sec"]}</td>
                    <td>{course["Name"]}</td>
                    <td>{course["Credits"]}</td>
                    <td>{course["Ects"]}</td>
                    <td>{course["Instr."]}</td>
                    <td>{course["Timestring"]}</td>
                    <td>Conflicts: {this.doesThisConflict(course["Days"],course["Hours"])}</td>
                    <td><button onClick={this.addCourse.bind(this,course["Days"],course["Hours"],course["Code_Sec"])}>Add</button></td>
                    </tr>
                );
            })
            return displayArray;
        }
        else {
            return (
                <tr>
                <td>Start by typing in your course code.</td>
                </tr>
            );
        }
    }
    render() {
        var sty = {};
        if (this.props.results.length !== 0) {
            sty = {height: 400, overflowY:'scroll', overflowX:'hidden'}
        }
        else {
            sty = {marginLeft: "auto",marginRight: "auto"}
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