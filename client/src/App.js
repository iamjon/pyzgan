import './App.css';
import React, { useState, useEffect } from 'react';
import RemoteControl from './components/RemoteControl';
import Schedule from './components/Schedule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureLow, faHome, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { getRemoteControlSchedule, getRemoteControlStatus } from './api';
import { isEmpty } from './helpers/helpers';
import { RemoteStatusContext } from './helpers/RemoteStatusContext';

const App = () => {
    // viewMode is ac or schedule
    const [viewMode, setViewMode] = useState('ac');
    const [remoteStatus, setRemoteStatus] = useState({});
    const [remoteSchedule, setRemoteSchedule] = useState({});

    useEffect(() => {
        getRemoteControlStatus().then(status => {
            setRemoteStatus(status);
        });
        getRemoteControlSchedule().then(schedule => {
            setRemoteSchedule(schedule);
        });
    }, []);

    if (isEmpty(remoteStatus) || isEmpty(remoteSchedule)){
        return <div>TODO Add Loader</div>
    }

    const scheduleProps = {
        remoteStatus
    };

    return (
        <RemoteStatusContext.Provider value={remoteStatus}>
            <div className="link-container">
               <button className="btn" onClick={() => setViewMode('ac')}>
                    <FontAwesomeIcon icon={faHome} />  A/C
                </button>
                <button className="btn" onClick={() => setViewMode('schedule')}>
                    <FontAwesomeIcon icon={faCalendar} />  Schedule
                </button>
            </div>
            {viewMode === 'ac' &&
                <div className="link-container">
                    <FontAwesomeIcon icon={faTemperatureLow} />
                </div>
            }
            <div id="main-container" className={viewMode}>
                {viewMode === 'ac' && <RemoteControl {...remoteStatus} />}
                {viewMode === 'schedule' && <Schedule {...remoteSchedule} {...scheduleProps} />}
            </div>
            <div className="link-container"></div>
        </RemoteStatusContext.Provider>
    );
};

export default App;

