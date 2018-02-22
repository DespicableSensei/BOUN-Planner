import React from 'react';

class ResultCourse extends React.Component {
    constructor() {
        super();
        this.state = {
            height: 0
        };
    }
    addCourse(days, hours, courseCode) {
        this.props.addCourse(days, hours, courseCode);
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