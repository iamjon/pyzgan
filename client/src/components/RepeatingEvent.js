import React, { useState } from 'react';
import moment from 'moment';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TimePicker } from 'react-input-moment';

const RepeatingEvent = ({command, when, sync, onClose}) => {
    const [time, setTime] = useState(moment());
    const [day, setDay] = useState(0);

    const setAll = () => {
        console.log('day', day);
        sync({hour: time.hour(), minute: time.minute(), dayOfWeek: Number(day)});
        onClose();
    };

    return (
        <div className="command-container">
            <div className="command-item">
                <div className="form-group">
                    <select onChange={(e) => setDay(e.target.value)} className="form-control">
                        {moment.weekdays().map((day, index) => (<option key={index} value={index}>{day}</option>))}
                    </select>
                </div>
            </div>
            <div className="command-item">
                <TimePicker
                    moment={time}
                    onChange={(e) => setTime(e) }
                    showSeconds={false}
                    locale="en"
                />
            </div>
            <button  className="date-close" onClick={() => setAll()}>
                <FontAwesomeIcon icon={faCheck} /> Close
            </button>
        </div>
    );
};

export default RepeatingEvent;
