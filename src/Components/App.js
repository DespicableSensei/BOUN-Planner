import React, { Component } from 'react';
import '../App.css';

import all from '../amk.min.json';

import ActualTable from './ActualTable';
import CourseSearch from './CourseSearch';
import AddedCourses from "./AddedCourses";
import { MuiThemeProvider } from 'material-ui/styles';
import { Snackbar, Drawer } from 'material-ui';

class App extends Component {
  constructor() {
    super();
    var array = new Array(84);
    array = array.fill([""]);
    var myCourses = [];
    var myCoursesIndexes = [];
    var conflicts = [];
    this.state = {
      array:array,
      myCourses:myCourses,
      myCoursesIndexes:myCoursesIndexes,
      conflicts:conflicts,
      openNotification: false,
      notificationMessage: "",
      openDrawer: true,
    };
  }
  addToCourseList(indexArray, courseCode) {
    var currentCourses = JSON.parse(JSON.stringify(this.state.myCourses));
    var currentCoursesIndexes = JSON.parse(JSON.stringify(this.state.myCoursesIndexes));
    var currentConflicts = this.checkForConflicts();
    
    if (currentCourses.indexOf(courseCode) < 0) {
      currentCourses.push(courseCode);
      this.addToCells(indexArray,courseCode);
    }
    else {
      console.log("This course has already been added: " + courseCode);
      this.handleNotification(1, 0, courseCode);
      return
    }

    indexArray.forEach((index) => {
      if (currentCoursesIndexes.indexOf(index) < 0) {
        currentCoursesIndexes.push(index);
      }
      else {
        this.handleNotification(0, index, courseCode);
        console.log("There is a conflict at this index: " + index);
      }
    })

    this.setState({
      myCourses:currentCourses,
      myCoursesIndexes:currentCoursesIndexes,
      conflicts:currentConflicts,
    })
  }
  handleNotification(type, index, courseCode) {
    console.log("handled");
    var cur = JSON.parse(JSON.stringify(this.state.array));
    switch(type) {
      case 0:
        var message = "There is a conflict between " + courseCode + " and " + cur[index].slice(1).join(", ");
      break
      case 1:
        var message = "This course has already been added: " + courseCode;
      break
    }
    this.setState({
      notificationMessage: message,
      openNotification: true,
    });
  }
  removeFromCourseList(indexArray, courseCode) {
    var currentCourses = JSON.parse(JSON.stringify(this.state.myCourses));
    var currentCoursesIndexes = JSON.parse(JSON.stringify(this.state.myCoursesIndexes));
    var currentConflicts = this.checkForConflicts();
    

    if (currentCourses.indexOf(courseCode) < 0) {
      alert("There is no such course added?!");
      return
    }
    else {
      var removalIndex = currentCourses.indexOf(courseCode)
      currentCourses.splice(removalIndex, 1);
      this.removeFromCells(indexArray,courseCode);
    }

    indexArray.forEach((index) => {
      if (currentCoursesIndexes.indexOf(index) < 0) {
        return
      }
      else {
        var toRemove = currentCoursesIndexes.indexOf(index);
        currentCoursesIndexes.splice(toRemove,1);
        currentConflicts = this.checkForConflicts();
      }
    })

    this.setState({
      myCourses:currentCourses,
      myCoursesIndexes:currentCoursesIndexes,
      conflicts:currentConflicts,
    })
  }
  addToCells(indexArray, courseCode) {
    var cur = JSON.parse(JSON.stringify(this.state.array));
    indexArray.forEach((index) => {
      //Push Course Code
      cur[index].push(courseCode);
    });
    this.setState({array:cur});
  }
  removeFromCells(indexArray, courseCode) {
    var cur = JSON.parse(JSON.stringify(this.state.array));

    indexArray.forEach((index) => {
      var toRemove = cur[index].indexOf(courseCode);
      cur[index].splice(toRemove,1);
    });

    this.setState({array:cur});
  }
  getIndex(days, times, courseCode) {
    var timesOfChange = convertTime(days, times);
    var convertedArray = timesOfChange.map((initial) => {
      var col = initial.charAt(0);
      var row = initial.slice(1);
      return ((row*6)+(col-1)-5);
    })
    return convertedArray;
    //this.addToCourseList(convertedArray,courseCode);
  }
  addCourse(days, times, courseCode) {
    var convertedArray = this.getIndex(days, times, courseCode);
    this.addToCourseList(convertedArray,courseCode);    
  }
  removeCourse(courseName) {
    var courseInfo = {};
    all.forEach((courseInAll) => {
      if (courseInAll["Code_Sec"] === courseName.course) {
        courseInfo = courseInAll;
      }
    })
    var convertedArray = this.getIndex(courseInfo["Days"],courseInfo["Hours"],courseInfo["Code_Sec"]);
    // remove from added courses
    // check if conflict is resolved, if it is remove from there too
    // remove from cells
    this.removeFromCourseList(convertedArray,courseName.course);
  }
  checkForConflicts() {
    var currentArray = JSON.parse(JSON.stringify(this.state.array));
    var conflictArray = currentArray.map((cell,index) => {
      if (cell.length > 2) {
        var toReturn = index;
      }
      return toReturn;
    })
    conflictArray = conflictArray.filter((item) => {
      return item !== undefined;
    })
    return conflictArray;
  }
  handleRequestClose = () => {
    this.setState({
      openNotification: false,
    });
  };
  render() {
    return (
      <MuiThemeProvider>
      <div>
      <Drawer docked={true} openSecondary={true} width={700} open={this.state.openDrawer}>
      <CourseSearch getIndex={this.getIndex.bind(this)} courseIndexes={this.state.myCoursesIndexes} checkForConflicts={this.checkForConflicts.bind(this)} addCourse={this.addCourse.bind(this)} all={all} />
      <br/>
      <AddedCourses removeCourse={this.removeCourse.bind(this)} conflicts={this.checkForConflicts()} array={this.state.array} addedCourses={this.state.myCourses}/>
      </Drawer>
        <div  className="table">
        <ActualTable array={this.state.array}/>
        </div>
        <Snackbar open={this.state.openNotification} message={this.state.notificationMessage} autoHideDuration={4000} onRequestClose={this.handleRequestClose} />
      </div>
      </MuiThemeProvider>
    );
  }
}
//ThThTh
//101112
function convertTime(days, times) {
  var dayArray = [];
  var timeArray = [];
  var colArray = [];
  var finalArray = [];

  var slicedDays = days.split("");
  //Slice days string into individual items in an array
  slicedDays.map((item,index) => {
    if((item>="A" && item<="Z") || (item>="a" && item <= "z")) {
      if (item === "h") {
        dayArray.pop();
        dayArray.push("Th");
      }
      else if (item === "t") {
        dayArray.pop();
        dayArray.push("St");
      }
      else{
        dayArray.push(item);
      }
    }
    return "OK";
  })
  //Map column values to each day
  dayArray.map((day) => {
    switch(day) {
      case "M":
        colArray.push(0);
      break
      case "T":
        colArray.push(1);
      break
      case "W":
        colArray.push(2);
      break
      case "Th":
        colArray.push(3);
      break
      case "F":
        colArray.push(4);
      break
      case "St":
        colArray.push(5);
      break
      default:
        colArray.push(666);
      break
    }
    return "OK";
  })
  //Slice times string into individual time slots
  var slicedTimes = times.split("");
  var count = colArray.length;
  //EXAMPLE MWF333
  if (slicedTimes.length===count && slicedTimes.length !== 0) {
    slicedTimes.map((time) => {
      timeArray.push(time);
      return "OK";
    })
  }
  //EXAMPLE MWF101112
  if (slicedTimes.length===count*2 && slicedTimes.length !== 0) {
    for (var i = 0; i<slicedTimes.length; i = i + 2) {
      var topush = slicedTimes[i] + slicedTimes[i+1];
      timeArray.push(topush);
    }
  }
  //EXAMPLE MWF91011
  else {
    slicedTimes.map((item, index) => {
      switch(item) {
      default:
          console.log('');
      break
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
          timeArray.push(item);
      break
      case '1':
          var next = slicedTimes[index+1];
          if(next===undefined) {
              //timeArray.pop();
          }
          else if(next==='0' || next==='1' || next==='2' || next==='3' || next==='4') {
              var push = item + next;
              timeArray.push(push);
          }
      break
      }
    });
  }
    colArray.map((day,index) => {
    finalArray.push(day+timeArray[index]);
    return "OK";
  })
  return finalArray;
}
export default App;
