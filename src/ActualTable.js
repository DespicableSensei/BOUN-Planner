import React from 'react';

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
        return rowReturn;
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
    makeRow(rowArray) {
        var cellArray = rowArray.map((cell) => {
            return this.makeCell(cell);
        })
        return <tr>{cellArray}</tr>;
    }
    makeCell(cellArray) {
        var insideCellArray = cellArray.map((item) => {
            return <li>{item}</li>
        })
        return <td>{insideCellArray}</td>
    }
    makeAllRows() {
        var rowArray = [];
        for(var i = 0;i<14;i++) {
            rowArray.push(this.makeRow(this.giveRow(i)));
        }
        return rowArray;
    }
    render() {
        console.log(this.returnAllRows());
        return(
            <table border='2'>
                <thead>
                    <tr>
                        <th>Pazartesi</th>
                        <th>Sali</th>
                        <th>Carsamba</th>
                        <th>Persembe</th>
                        <th>Cuma</th>
                        <th>Cumartesi</th>
                    </tr>
                    </thead>
                <tbody>
                    {this.makeAllRows()}
                </tbody>
            </table>
        );
    }
}

export default ActualTable;