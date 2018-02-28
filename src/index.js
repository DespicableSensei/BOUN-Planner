import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRender from './Components/AppRender';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppRender />, document.getElementById('root'));
registerServiceWorker();
