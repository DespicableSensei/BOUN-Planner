import React from 'react';
import App from '../Components/App'

class AppRender extends React.Component {
    resize = () => this.forceUpdate();

    componentDidMount() {
        window.addEventListener('resize', this.resize)
    }
    componentWillUnmount() {
        window.addEventListener('resize', this.resize)
    }
    render() {
        return <App/>
    }
}

export default AppRender;