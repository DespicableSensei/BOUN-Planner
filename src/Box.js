import React from 'react';

class Box extends React.Component {
    mapArray() {
        return(
            this.props.infoArray.map((item,index) => {
                var courses = item.map((singleItem, singleIndex) => {
                    if (singleItem == 0) {return 0}
                    else {return <p>{singleItem}</p>}
                })
                var boxClass = (item==0) ? 'box hide' : 'box';
                return <div className={boxClass} id={index} onClick={this.handleClick.bind(this)} key={Math.random()}>{courses}</div>
            })
        )
    }
    getRows() {
        var outerIndex = 0;
        this.props.infoArray.map((item,index) => {

        })
    }
    handleClick(e) {
        console.log(e.target.id);
        this.props.increaseCell(e.target.id, "MOUSE");
    }
    render() {
        console.log(this.mapArray());
        return(
            <div className='grid'>
                <div className='box' key={Math.random()}>Pazartesi</div>
                <div className='box' key={Math.random()}>Sali</div>
                <div className='box' key={Math.random()}>Carsamba</div>
                <div className='box' key={Math.random()}>Persembe</div>
                <div className='box' key={Math.random()}>Cuma</div>
                {this.mapArray()}
            </div>
        );
    }
}

export default Box;