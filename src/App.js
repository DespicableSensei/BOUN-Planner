import React, { Component } from 'react';
import './App.css';

import data from './deps.json';
import all from './amk.min.json';

import ActualTable from './ActualTable';
import CourseSearch from './CourseSearch';

class App extends Component {
  constructor() {
    super();
    var array = new Array(84);
    array = array.fill([""]);
    this.state = {
      array:array,
    };
    console.log(all);
    console.log(array);
  }
  increaseCells(indexArray, courseCode) {
    var cur = JSON.parse(JSON.stringify(this.state.array));
    indexArray.forEach((index) => {
      //Check for 0 state
      if (cur[index][0] === 0) {
        cur[index].pop();
      }
      //Check for identical course

      //Push Course Code
      cur[index].push(courseCode);
    });
    this.setState({array:cur});
  }
  getValue(days, times, courseCode) {
    console.log(days, times);
    var timesOfChange = convertTime(days, times);
    var convertedArray = timesOfChange.map((initial) => {
      var col = initial.charAt(0);
      var row = initial.slice(1);
      return ((row*6)+(col-1)-5);
    })
    console.log(convertedArray);
    this.increaseCells(convertedArray,courseCode);
  }
  render() {
    return (
      <div>
      <CourseSearch addCourse={this.getValue.bind(this)} data={data} all={all} />
      <br/>
        <div  className="table">
        <ActualTable array={this.state.array}/>
        </div>
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

  if (slicedTimes.length===count && slicedTimes.length !== 0) {
    console.log("bir kat");
    slicedTimes.map((time) => {
      timeArray.push(time);
      return "OK";
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
    return "OK";
  })
  console.log(finalArray);
  return finalArray;
}
export default App;
