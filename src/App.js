import React, { Component } from 'react';
import './App.css';

import data from './deps.json';
import all from './amk.min.json';

import Table from './Table';
import Buttons from './Buttons';
import CourseSearch from './CourseSearch';

var array = new Array(60);
array = array.fill([0]);

class App extends Component {
  constructor() {
    super();
    this.state = {
      array:array,
    };
    console.log(all);
    console.log(array);
  }
  increaseByOne() {
    var cur = this.state.array;
    var newcur = cur.map((item) => {
      return item+1;
    });
    this.setState({array:newcur});
  }
  decreaseByOne() {
    var cur = this.state.array;
    var newcur = cur.map((item) => {
      return item-1;
    });
    this.setState({array:newcur});
  }
  increaseSpecificCell(index, courseCode) {
    console.log("ISC");
    if(index>this.state.array.length) {alert('O kadar ders yok olm')}
    else {
    var cur = JSON.parse(JSON.stringify(this.state.array));
    let curToPush = cur[index];
    console.log("KURUNDEX");
    console.log(cur[index]);
    if(curToPush[0] === 0) {curToPush.pop();}
    curToPush.push("hahaha");
    this.setState({array:cur});
    }
  }
  increaseSpecificCellConflicted(index, courseCode) {
    if(index>this.state.array.length) {alert('O kadar ders yok olm')}
    else {
    var cur = this.state.array;
    cur[index] = cur[index] + courseCode;
    this.setState({array:cur});
    }
  }
  checkForConflict(target, course) {
    var isThereConflict = false;
    var cur = this.state.array;
    if (cur[target][0] !== 0 && cur[target] !== course) {
      isThereConflict = true;
    }
    console.log(target, course);
    console.log(cur[target]);
    return isThereConflict;
  }
  getValue(days, times, courseCode) {
    console.log(days, times);
    var currentArray = this.state.array;
    var timesOfChange = convertTime(days, times);
    var convertedArray = timesOfChange.map((initial) => {
      var col = initial.charAt(0);
      var row = initial.slice(1);
      return ((row*5)+(col-1)-4);
    })
    console.log(convertedArray);
    convertedArray.forEach((index) => {
      //var conflict = this.checkForConflict(index,courseCode);
      // if (conflict) {
      //   alert("Conflict @ " + index + ". Between " + courseCode + " and " + currentArray[index]);
      //   console.log("Conflict @ " + index + ". Between " + courseCode + " and " + currentArray[index]);
      //   this.increaseSpecificCellConflicted(index, courseCode);
      // }
      // else {
        this.increaseSpecificCell(index, courseCode);
      //}
    })
  }
  render() {
    return (
      <div>
      <center>
      <CourseSearch addCourse={this.getValue.bind(this)} data={data} all={all} />
      <Buttons funcOne={this.increaseByOne.bind(this)} funcTwo={this.decreaseByOne.bind(this)} takeInput={this.getValue.bind(this)}/>
      <div  className="app">
        <Table array={this.state.array} increaseCell={this.increaseSpecificCell.bind(this)}/>
      </div>
      {this.state.array.join()}
      </center>
      </div>
    );
  }
}
//ThThTh
//101112
function convertTime(days, times) {
  console.log(days, times);
  var dayArray = [];
  var timeArray = [];
  var colArray = [];
  var finalArray = [];

  var slicedDays = days.split("");
  //Slice days string into individual items in an array
  slicedDays.map((item,index) => {
    if(item>="A" && item<="Z" || item>="a" && item <= "z") {
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
  })
  //Slice times string into individual time slots
  var slicedTimes = times.split("");
  var count = colArray.length;

  if (slicedTimes.length===count && slicedTimes.length !== 0) {
    console.log("bir kat");
    slicedTimes.map((time) => {
      timeArray.push(time);
    })
  }
  if (slicedTimes.length===count*2 && slicedTimes.length !== 0) {
    console.log("iki kat");
    for (var i = 0; i<slicedTimes.length; i = i + 2) {
      var topush = slicedTimes[i] + slicedTimes[i+1];
      timeArray.push(topush);
    }
  }
    colArray.map((day,index) => {
    finalArray.push(day+timeArray[index]);
  })
  console.log(finalArray);
  return finalArray;
}

// function convertTime(timestring) {
//   var slicedString = timestring.split("");
//   var dayArray = [];
//   var timeArray = [];
//   var colArray = [];
//   var finalArray = [];
//   slicedString.map((item,index) => {
//     if(item>='A' && item<='z') {
//       if (item === "h") {
//         dayArray.pop();
//         dayArray.push("Th");
//       }
//       else{
//         dayArray.push(item);
//       }
//     }
//     else {
//       timeArray.push(item);
//     }
//   });
//   dayArray.map((day) => {
//     switch(day) {
//       case "M":
//         colArray.push(0);
//       break;
//       case "T":
//         colArray.push(1);
//       break;
//       case "W":
//         colArray.push(2);
//       break;
//       case "Th":
//         colArray.push(3);
//       break;
//       case "F":
//         colArray.push(4);
//       break;
//     }
//   })

//   colArray.map((day,index) => {
//     finalArray.push(day+timeArray[index]);
//   })
//   return finalArray;
// }
export default App;
