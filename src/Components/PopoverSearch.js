import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import CourseSearch from './CourseSearchTwo';
import ResultCourse from './ResultCourse'

export default class PopoverSearch extends React.Component {

  render() {
    return (
      <div>
        <Popover
          open={this.props.open}
          anchorEl={this.props.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.props.handleRequestClose}
        >
        <ResultCourse getIndex={this.props.getIndex} courseIndexes={this.props.courseIndexes} checkForConflicts={this.props.checkForConflicts} addCourse={this.props.addCourse} data={this.props.data} all={this.props.all} results={this.props.matchedSearch}/>
        </Popover>
      </div>
    );
  }
}
