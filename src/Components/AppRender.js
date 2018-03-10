import React from 'react';
import App from '../Components/App'
import { CookiesProvider } from 'react-cookie';

class AppRender extends React.Component {
    resize = () => this.forceUpdate();

    componentDidMount() {
        window.addEventListener('resize', this.resize)
    }
    componentWillUnmount() {
        window.addEventListener('resize', this.resize)
    }
    render() {
        return (
        <CookiesProvider>
            <App/>
        </CookiesProvider>
        )
    }
}

export default AppRender;