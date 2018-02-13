import React from 'react';

class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: 'MWF333'
        }
    }
    handleClick(e) {
        this.props.funcOne();
    }
    handleClickTwo(e) {
        this.props.funcTwo();
    }
    handleChange(e) {
        this.setState({inputVal: e.target.value})
    }
    handleSubmit(e) {
        e.preventDefault();
        var val = this.state.inputVal;
        this.props.takeInput(val);
    }
    render() {
        return(
            <div className='buttons'>
                <table>
                <tbody>
                <tr>
                <td className='button'><button onClick={this.handleClick.bind(this)}>+</button></td>
                <td className='button'><button onClick={this.handleClickTwo.bind(this)}>-</button></td>
                <td><form onSubmit={this.handleSubmit.bind(this)}><input onChange={this.handleChange.bind(this)} value={this.state.inputVal}></input></form></td>
                </tr>
                </tbody>
                </table>
            </div>
        );
    }
}

export default Buttons;