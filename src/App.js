import React, { Component } from 'react';
import './App.css';

import data from './deps.json';
import all from './ALL.min.json';

import Table from './Table';
import Buttons from './Buttons';
import CourseSearch from './CourseSearch';

var array = new Array(60);
array = array.fill(0);


class App extends Component {
  constructor() {
    super();
    this.state = {
      array:array,
    }
    console.log(Object.keys(all));
    console.log(all);
  }
  increaseByOne() {
    var cur = this.state.array;
    var newcur = cur.map((item) => {
      return item+1;
    })
    this.setState({array:newcur})
  }
  decreaseByOne() {
    var cur = this.state.array;
    var newcur = cur.map((item) => {
      return item-1;
    })
    this.setState({array:newcur})
  }
  increaseSpecificCell(index, courseCode) {
    if(index>this.state.array.length) {alert('O kadar ders yok olm')}
    else {
    var cur = this.state.array;
    cur[index] = courseCode;
    this.setState({array:cur});
    }
  }
  getValue(incoming, courseCode) {
    var timesOfChange = convertTime(incoming);
    var convertedArray = timesOfChange.map((initial) => {
      var col = initial.charAt(0);
      var row = initial.charAt(1);
      return ((row*5)+(col-1)-4);
    })
    convertedArray.forEach((index) => {
      this.increaseSpecificCell(index, courseCode);
    })
  }
  render() {
    return (
      <div>
      <center>
      <CourseSearch addCourse={this.getValue.bind(this)} data={data} all={all}/>
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
function convertTime(timestring) {
  var slicedString = timestring.split("");
  var dayArray = [];
  var timeArray = [];
  var colArray = [];
  var finalArray = [];
  slicedString.map((item,index) => {
    if(item>='A' && item<='z') {
      if (item === "h") {
        dayArray.pop();
        dayArray.push("Th");
      }
      else{
        dayArray.push(item);
      }
    }
    else {
      timeArray.push(item);
    }
  });
  dayArray.map((day) => {
    switch(day) {
      case "M":
        colArray.push(0);
      break;
      case "T":
        colArray.push(1);
      break;
      case "W":
        colArray.push(2);
      break;
      case "Th":
        colArray.push(3);
      break;
      case "F":
        colArray.push(4);
      break;
    }
  })

  colArray.map((day,index) => {
    finalArray.push(day+timeArray[index]);
  })
  return finalArray;
}
export default App;
