import './App.css';
import React, { useState, Fragment } from 'react';
import RemoteControl from './components/RemoteControl';
import Schedule from './components/Schedule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureLow, faHome, faCalendar } from '@fortawesome/free-solid-svg-icons'

const App = () => {
    // viewMode is ac or schedule
    const [viewMode, setViewMode] = useState('ac');
    return (
        <Fragment>
            <div className="link-container">
               <button className="btn" onClick={() => setViewMode('ac')}>
                    <FontAwesomeIcon icon={faHome} />  A/C
                </button>
                <button className="btn" onClick={() => setViewMode('schedule')}>
                    <FontAwesomeIcon icon={faCalendar} />  Schedule
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

