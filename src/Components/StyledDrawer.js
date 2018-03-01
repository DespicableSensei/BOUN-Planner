import React from 'react';
import Drawer from 'material-ui/Drawer';

class StyledDrawer extends React.Component {
    constructor() {
        super();
        this.state = {
            depth: 2,
        }
    }
    render() {
        const containerStyle = {
            zIndex: 1000,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 20,
            top: 64+15,
            position: 'absolute',
            height: this.props.divHeight,
        }
        return (
            <Drawer containerStyle={containerStyle} zDepth={this.state.depth} docked={this.props.open} openSecondary={true} width={'20%'} open={this.props.open} >
                {this.props.children}
            </Drawer>
        );
    }
}

export default StyledDrawer;