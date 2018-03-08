import React from 'react';
import { Table, TableBody, TableRow, TableRowColumn, TableHeader } from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import {TableHeaderColumn} from 'material-ui'
import AddIcon from 'material-ui/svg-icons/navigation/check'

class ResultCourse extends React.Component {
    addCourse(days, hours, courseCode) {
        this.props.addCourse(days, hours, courseCode);
    }
    doesThisConflict(days, hours) {
        var arrayOfThisCourse = this.props.getIndex(days, hours);
        var arrayOfCourseIndexes = this.props.courseIndexes;
        if(arrayOfThisCourse.length !== 0) {
            var resultOfCheck = arrayOfThisCourse.reduce((acc, cur) => {
                var currentConflict = (arrayOfCourseIndexes.indexOf(cur) > -1)?1:0;
                return acc + currentConflict;
            },0);
        }
        if(arrayOfThisCourse.length === 0) {
            resultOfCheck = 0;
        }
        return resultOfCheck;
    }
    listResults() {
        let matchedDeps = this.props.results;
        if(matchedDeps.length !== 0) {
            var displayArray = matchedDeps.slice(0,9).map((course,index) => {
                return (
                    <TableRow key={index}>
                    <TableRowColumn colSpan={2} >{course["Code_Sec"]}</TableRowColumn>
                    <TableRowColumn colSpan={3} >{course["Name"]}</TableRowColumn>
                    <TableRowColumn colSpan={1} style={{textAlign: 'center', margin: '0 auto'}} ><center>{course["Credits"]}/{course["Ects"]}</center></TableRowColumn>
                    <TableRowColumn colSpan={2} >{course["Instr."]}</TableRowColumn>
                    <TableRowColumn colSpan={2} >{course["Timestring"]}</TableRowColumn>
                    <TableRowColumn colSpan={1} style={{textAlign: 'center'}} >#{this.doesThisConflict(course["Days"],course["Hours"])}</TableRowColumn>
                    <TableRowColumn colSpan={2} ><center><FloatingActionButton mini={true} onClick={this.addCourse.bind(this,course["Days"],course["Hours"],course["Code_Sec"])} ><AddIcon/></FloatingActionButton></center></TableRowColumn>
                    </TableRow>
                );
            })
            return displayArray;
        }
        else {
            return (
                <TableRow>
                <TableRowColumn>Start by typing in your course code.</TableRowColumn>
                </TableRow>
            );
        }
    }
    render() {
        return (
            <div className='courseScroll' >
                <Table>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false} >
                        <TableRow>
                            <TableHeaderColumn colSpan={2} >Course Code</TableHeaderColumn>
                            <TableHeaderColumn colSpan={3} >Course Name</TableHeaderColumn>
                            <TableHeaderColumn colSpan={1} style={{textAlign: 'center'}} >Credits/ECTS</TableHeaderColumn>
                            <TableHeaderColumn colSpan={2} >Instructor</TableHeaderColumn>
                            <TableHeaderColumn colSpan={2} >Times</TableHeaderColumn>
                            <TableHeaderColumn colSpan={1} style={{textAlign: 'center'}}  >Conflicts</TableHeaderColumn>
                            <TableHeaderColumn colSpan={2} style={{textAlign: 'center'}} >Add</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} >
                        {this.listResults()}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default ResultCourse;