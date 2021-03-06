import React from 'react';
import randomColor from 'randomcolor';

Math.seed = function(s) {
        //string to number
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
        var cellArray = rowArray.map((cell) => {
            return this.makeCell(cell,timeIndex);
        })
        return <tr key={Math.random()}><td className={'timeIndex'}>{this.giveActualTime(timeIndex)}</td>{cellArray}</tr>;
    }
    makeCell(cellArray,timeIndex) {
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
        return <td key={Math.random()}>{insideCellArray}</td>
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
    render() {
        var tableDivClass = (this.props.drawer)?'tableDivOpenDrawer':'tableDiv';
        return(
            <div ref={ (divElement) => this.divElement = divElement} className={tableDivClass}>
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