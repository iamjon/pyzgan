import './App.css';
import React, { useState, Fragment } from 'react';
import RemoteControl from './components/RemoteControl';
import Schedule from './components/Schedule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons'

const App = () => {
    // viewMode is ac or schedule
    const [viewMode, setViewMode] = useState('ac');
    return (
        <Fragment>
            <div className="link-container">
                <button onClick={() => setViewMode('ac')}>
                    Ac
                </button>
                <button onClick={() => setViewMode('schedule')}>
                    Schedule
                </button>
            </div>
            <div className="link-container">
                <FontAwesomeIcon icon={faTemperatureLow} />
            </div>
            <div id="main-container">
                {viewMode === 'ac' && <RemoteControl/>}
                {viewMode === 'schedule' && <Schedule />}
            </div>
            <div className="link-container"></div>
        </Fragment>
    );
};

export default App;

