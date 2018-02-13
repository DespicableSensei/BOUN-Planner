import React from 'react';
import Box from './Box';

class Table extends React.Component {
    render() {
        return(
            <div>
                <Box infoArray={this.props.array} increaseCell={this.props.increaseCell}/>
            </div>
        );
    }
}

export default Table;