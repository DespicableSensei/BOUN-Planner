import React from "react";

import ResultCourse from './ResultCourse';

class CourseSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSearch: '',
            matchedSearch: [],
            allCourses: this.props.all
        }
    }
    handleChange(e) {
        var change = e.target.value.toUpperCase();
        let deps = this.props.all;
        var matchedDeps = [];
        deps.forEach((dep) => {
            if (dep["Code_Sec"].startsWith(change) && change !== '') {
                matchedDeps.push(dep);
            }
        });
        this.setState({
            currentSearch: change,
            matchedSearch: matchedDeps
        });
    }
    render() {
        return (
            <div className='courseSearch'>
                <center>
                <div className="inputClass">
                    <input placeholder="Course Code" onChange={this.handleChange.bind(this)}></input>
                </div>
                
                </center>
                <div>
                    <ResultCourse getIndex={this.props.getIndex} courseIndexes={this.props.courseIndexes} checkForConflicts={this.props.checkForConflicts} addCourse={this.props.addCourse} data={this.props.data} all={this.props.all} results={this.state.matchedSearch}/>
                </div>
            </div>
        );
    }
}

export default CourseSearch;