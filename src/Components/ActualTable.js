import React from 'react';
import randomColor from 'randomcolor';

Math.seed = function(s) {
        //string to number
        console.log(s);
        var seed = s.split('').map(i => i.charCodeAt()).join('');
        return seed
};

class ActualTable extends React.Component {
    giveCol(dayIndex) {
        var colReturn = [];
        for(var i = dayIndex; i<=dayIndex + 78; i = i + 6) {
            colReturn.push(this.props.array[i]);
        }
        return colReturn;
    }
    giveRow(timeIndex) {
        var rowReturn = [];
        for(var i = timeIndex*6; i<timeIndex*6+6; i++) {
            rowReturn.push(this.props.array[i]);
        }
        return [rowReturn, timeIndex];
    }
    returnAllRows() {
        var currentAllRows = [];
        for(var i = 0;i<14;i++) {
            currentAllRows.push(this.giveRow(i))
        }
        return currentAllRows;
    }
    returnAllCols() {
        var currentAllCols = [];
        for(var i = 0;i<6;i++) {
            currentAllCols.push(this.giveCol(i))
        }
        return currentAllCols;
    }
    makeRow(makeRowArray) {
        //makeRowArray: [rowReturn, timeIndex]
        var rowArray = makeRowArray[0];
        var timeIndex = makeRowArray[1];
        var cellArray = rowArray.map((cell,index) => {
            var cellId = 'cell'+(parseInt(timeIndex,10) * 6 + parseInt(index,10));
            return this.makeCell(cell,timeIndex,cellId);
        })
        return <tr id={'row'+timeIndex} key={'row'+timeIndex}><td className={'timeIndex'}>{this.giveActualTime(timeIndex)}</td>{cellArray}</tr>;
    }
    makeCell(cellArray,timeIndex,cellId) {
        var insideCellArray = cellArray.map((item) => {
            var pad = (item!=='')?5:0;
            return <li 
            style={{
                background: randomColor({
                    seed: Math.seed(item),
                    luminosity: 'light',
                    hue: 'random'
                }),
                paddingTop: pad,
                paddingBottom: pad,
                margin: -2
            }} 
            key={Math.random()}
            >
            {item}
            </li>
        })
        return <td id={cellId} key={cellId}>{insideCellArray}</td>
    }
    makeAllRows() {
        var rowArray = [];
        for(var i = 0;i<14;i++) {
            rowArray.push(this.makeRow(this.giveRow(i)));
        }
        return rowArray;
    }
    giveActualTime(timeIndex) {
        var startTimeIndex = timeIndex+9;
        //var endTimeIndex = timeIndex+10;
        //var finalTimeString = startTimeIndex + ":00 - " + endTimeIndex + ":00";
        var finalTimeString = startTimeIndex + ":00";
        return finalTimeString;
    }
    componentDidMount() {
        const height = this.divElement.clientHeight;
        this.props.setdiv(height);
    }
    placeYourself(blockLength,colorSeed,cellNumber) {
        var dayIndex = 0;
        var tableWidth = (this.props.drawer)?Math.ceil(document.defaultView.innerWidth * 0.8 - 32):Math.ceil(document.defaultView.innerWidth - 32);
        let posObject = {display:'none'}
        let el = document.querySelector('#cell'+cellNumber);
        let placement = el && el.getBoundingClientRect();
        var background = randomColor({
            seed: Math.seed(colorSeed),
            luminosity: 'light',
            hue: 'random'
        })
        let parent = el && el.parentElement;
        switch(cellNumber) {
            default:
            case 0:case 6:case 12:case 18:case 24:case 30:case 36:case 42:case 48:case 54:case 60:case 66:case 72:case 78:
                dayIndex = 0;
            break
            case 1:case 7:case 13:case 19:case 25:case 31:case 37:case 43:case 49:case 55:case 61:case 67:case 73:case 79:
                dayIndex = 1;
            break
            case 2:case 8:case 14:case 20:case 26:case 32:case 38:case 44:case 50:case 56:case 62:case 68:case 74:case 80:
                dayIndex = 2;
            break
            case 3:case 9:case 15:case 21:case 27:case 33:case 39:case 45:case 51:case 57:case 63:case 69:case 75:case 81:
                dayIndex = 3;
            break
            case 4:case 10:case 16:case 22:case 28:case 34:case 40:case 46:case 52:case 58:case 64:case 70:case 76:case 82:
                dayIndex = 4;
            break
            case 5:case 11:case 17:case 23:case 29:case 35:case 41:case 47:case 53:case 59:case 65:case 71:case 77:case 83:
                dayIndex = 5;
            break
        }
        if (placement!==null) {
            console.log(placement.top);
            posObject = {borderLeft: '4px solid rgba(0,0,0,0.4)',borderRadius:5,position:'absolute',backgroundColor: background,top:placement.top,left:tableWidth/7*(dayIndex+1)+16,width:tableWidth/7-4,height:placement.height*blockLength}
        }
        return (
          <div className={'transition'} style={posObject}>
            
          </div>
        )
    }
    makeAllLabels() {
        var yeh = JSON.parse(JSON.stringify(this.props.courseIndexes))
        var myNew = yeh.map((courseIndex, index) => {
            this.placeYourself(1,courseIndex,courseIndex)
        })
        return myNew
    }
    render() {
        var tableDivClass = (this.props.drawer)?'tableDivOpenDrawer':'tableDiv';
        var tableWidth = (this.props.drawer)?document.defaultView.innerWidth * 0.8 - 32:document.defaultView.innerWidth - 32;
        return(
            <div ref={ (divElement) => this.divElement = divElement} style={{width: tableWidth }} className={tableDivClass}>
            {this.makeAllLabels()}
            <table id="coursesTable">
                <thead>
                    <tr>
                        <th>Saat</th>
                        <th>Pazartesi</th>
                        <th>Salı</th>
                        <th>Çarşamba</th>
                        <th>Perşembe</th>
                        <th>Cuma</th>
                        <th>Cumartesi</th>
                    </tr>
                    </thead>
                <tbody>
                    {this.makeAllRows()}
                </tbody>
            </table>
            </div>
        );
    }
}

export default ActualTable;