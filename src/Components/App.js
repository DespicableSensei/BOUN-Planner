import { blueGrey50 } from "material-ui/styles/colors";
import { instanceOf } from 'prop-types';
import { lightBlueA400 } from "material-ui/styles/colors";
import { MuiThemeProvider } from "material-ui/styles";
import { Snackbar, AppBar, IconButton, TextField, Tabs , Tab} from "material-ui";
import { withCookies, Cookies } from 'react-cookie';
import FontIcon from 'material-ui/FontIcon';
import getMuiTheme from "material-ui/styles/getMuiTheme";
import React, { Component } from 'react';

import ActualTable from "./ActualTable";
import AddedCourses from "./AddedCourses";
import PopoverSearch from './PopoverSearch'
import StyledDrawer from "./StyledDrawer";
import Counters from './Counters';

import '../App.css';
import all from '../1819-1c.json';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
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
      appBarDepth: 2,
      openPopover: false,
      currentSearch: '',
      matchedSearch: '',
      divHeight: '',
    };
  }

  componentWillMount() {
    const { cookies } = this.props;
    let cookieStringToBool;
    if (cookies.get('openDrawer') === undefined) {cookieStringToBool = true}
    else {cookieStringToBool = (cookies.get('openDrawer') === 'true')}
    this.setState({
      array: cookies.get('array') || this.state.array,
      myCourses: cookies.get('myCourses') || [],
      myCoursesIndexes: cookies.get('myCoursesIndexes') || [],
      conflicts: cookies.get('conflicts') || [],
      openDrawer: cookieStringToBool
    });
  }

  addToCourseList(indexArray, courseCode) {
    const { cookies } = this.props;
    var currentCourses = JSON.parse(JSON.stringify(this.state.myCourses));
    var currentCoursesIndexes = JSON.parse(JSON.stringify(this.state.myCoursesIndexes));
    var currentConflicts = this.checkForConflicts();
    
    if (currentCourses.indexOf(courseCode) < 0) {
      currentCourses.push(courseCode);
      this.handleNotification(2,0, courseCode);
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
    cookies.set('myCourses', JSON.stringify(currentCourses));
    cookies.set('myCoursesIndexes', JSON.stringify(currentCoursesIndexes));
    cookies.set('conflicts', JSON.stringify(currentConflicts));
  }
  handleNotification(type, index, courseCode) {
    const { cookies } = this.props;
    var cur = JSON.parse(JSON.stringify(this.state.array));
    var message = '';
    switch(type) {
      default:
        message = 'Something went wrong!';
      break
      case 0:
        message = "There is a conflict between " + courseCode + " and " + cur[index].slice(1).join(", ");
      break
      case 1:
        message = "This course has already been added: " + courseCode;
      break
      case 2:
        message = courseCode + " has been added.";
      break
      case 3:
        message = courseCode + " has been removed.";
      break
      case 4:
        message = "~2018 | Emre Öztürk | @kuzubaba";
      break
    }
    this.setState({
      notificationMessage: message,
      openNotification: true,
    })
    cookies.set('notificationMessage', message);
    cookies.set('openNotification', true);
  }
  removeFromCourseList(indexArray, courseCode) {
    const { cookies } = this.props;
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
      this.handleNotification(3,0,courseCode);
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
    cookies.set('myCourses', JSON.stringify(currentCourses));
    cookies.set('myCoursesIndexes', JSON.stringify(currentCoursesIndexes));
    cookies.set('conflicts', JSON.stringify(currentConflicts));
  }
  addToCells(indexArray, courseCode) {
    const { cookies } = this.props;
    var cur = JSON.parse(JSON.stringify(this.state.array));
    indexArray.forEach((index) => {
      if (indexArray.some((i) => i === index + 6)) {console.log("DUDE BLOK DERS BETWEEN: " + index + "-" + (index+6))}
      //Push Course Code
      cur[index].push(courseCode);
    });
    this.setState({array:cur});
    cookies.set('array', JSON.stringify(cur));
  }
  removeFromCells(indexArray, courseCode) {
    const { cookies } = this.props;
    var cur = JSON.parse(JSON.stringify(this.state.array));

    indexArray.forEach((index) => {
      var toRemove = cur[index].indexOf(courseCode);
      cur[index].splice(toRemove,1);
    });

    this.setState({array:cur});
    cookies.set('array', JSON.stringify(cur));

  }
  getIndex(days, times, courseCode) {
    var timesOfChange = convertTime(days, times);
    var convertedArray = timesOfChange.map((initial) => {
      var col = initial.charAt(0);
      var row = initial.slice(1);
      return ((row*6)+(col-1)-5);
    })
    return convertedArray;
  }
  addCourse(days, times, courseCode) {
    var convertedArray = this.getIndex(days, times, courseCode);
    this.handlePopoverClose();
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
    const { cookies } = this.props;
    this.setState({
      openNotification: false,
    });
    cookies.set('openNotification', false);
  };
  handleRequestCloseDrawer = () => {
    const { cookies } = this.props;
    this.setState({
      openDrawer: !this.state.openDrawer,
    });
    var drawerStatusToSet = !this.state.openDrawer;
    console.log(drawerStatusToSet);
    cookies.set('openDrawer', drawerStatusToSet);
  };
  popOver(event) {
    event.preventDefault();
    this.setState({
      openPopover: true,
      anchorEl: event.currentTarget,
    });
  }
  handlePopoverClose() {
    this.setState({
      openPopover: false,
    });
  }
  handleSearch(e) {
    var change = e.target.value.toUpperCase();
        let deps = all;
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
  setDivHeight(height) {
    this.setState({
      divHeight: height,
    })
  }
  handleTitleClick() {
    this.handleNotification(4,0,0);
  }
  render() {
    let titleStyle = {
      textAlign: "center",
      textShadow: "2px 2px rgba(100, 100, 100, 0.4)",
      fontSize: 32,
      marginLeft: -240,
    };
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: lightBlueA400,
        primary2Color: blueGrey50,
      }
    });
    let inputStyle = {
      floatinglabel: {
        color: blueGrey50,
      },
      hintstyle: {
        color: blueGrey50,
      },
      underlinestyle: {
        borderColor: blueGrey50,
      }
    }
    let icon = (this.state.openDrawer)?<FontIcon className={'material-icons biggerIcon'}>keyboard_arrow_right</FontIcon>:<FontIcon className={'material-icons biggerIcon'}>keyboard_arrow_left</FontIcon>;
    return(
      <MuiThemeProvider muiTheme={muiTheme}>
      <div id={'whatAreYouLookingFor'}>
        <AppBar
          id={'appbar'}
          title={"BOUN Course Planner +"}
          onTitleClick={this.handleTitleClick.bind(this)}
          showMenuIconButton={true}
          iconElementRight={<IconButton onClick={this.handleRequestCloseDrawer.bind(this)} >{icon}</IconButton>}
          iconElementLeft={<TextField inputStyle={inputStyle.hintstyle} value={this.state.currentSearch} onChange={this.handleSearch.bind(this)} underlineFocusStyle={inputStyle.underlinestyle} floatingLabelStyle={inputStyle.floatinglabel} hintStyle={inputStyle.hintstyle} onFocus={this.popOver.bind(this)} hintText={'Course Code'} />}
          titleStyle={titleStyle}
          zDepth={this.state.appBarDepth}
        />
        <div className={"mainContent"}>
        <ActualTable setdiv={this.setDivHeight.bind(this)} drawer={this.state.openDrawer} array={this.state.array} />
        <StyledDrawer divHeight={this.state.divHeight} open={this.state.openDrawer}>
          <Counters conflicts={this.checkForConflicts()} addedCourses={this.state.myCourses} all={all} />
          <Tabs style={{marginLeft: -16, marginRight: -16}} >
            <Tab label={'Added Courses'}>
              <div style={{marginLeft: 16, marginRight: 16, marginTop:20}} >
                <AddedCourses all={all} removeCourse={this.removeCourse.bind(this)} conflicts={this.checkForConflicts()} array={this.state.array} addedCourses={this.state.myCourses} />
              </div>
            </Tab>
            <Tab label={'Browse'}>
              <div style={{marginLeft: 16, marginRight: 16, marginTop:20}} >
              ehehehehe
              </div>
            </Tab>
          </Tabs>
        </StyledDrawer>
        </div>
        <PopoverSearch 
        open={this.state.openPopover} 
        handleRequestClose={this.handlePopoverClose.bind(this)} 
        anchorEl={this.state.anchorEl}
        getIndex={this.getIndex.bind(this)}
        courseIndexes={this.state.myCoursesIndexes}
        checkForConflicts={this.checkForConflicts.bind(this)}
        addCourse={this.addCourse.bind(this)}
        all={all}
        matchedSearch={this.state.matchedSearch}
        />
        <Snackbar 
          open={this.state.openNotification} 
          message={this.state.notificationMessage} 
          autoHideDuration={4000} 
          onRequestClose={this.handleRequestClose} 
        />
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
      return 'OK';
    });
  }
    colArray.map((day,index) => {
    finalArray.push(day+timeArray[index]);
    return "OK";
  })
  return finalArray;
}
export default withCookies(App);
