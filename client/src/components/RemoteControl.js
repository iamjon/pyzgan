import React, { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faCircle, faPowerOff, faFan, faTemperatureLow } from '@fortawesome/free-solid-svg-icons'
import { faCircle as faRegularCircle } from '@fortawesome/free-regular-svg-icons'
import RemoteControlMode from './RemoteControlMode';
import { setTemperature } from '../api';

const RemoteControl = () => {
    const [power, setPower] = useState(false);
    const [temp, setTemp] = useState(20);
    const [fan, setFan] = useState(1);
    // cool heat fan
    const [mode, setMode] = useState('cool');

    const clickPower = () => {
        return setPower(!power);
    };

    const clickFan = () => {
        if (fan < 4){
            return setFan(fan + 1);
        }
        return setFan(1);
    };

    useEffect(() => {
        console.log('useEffect');
        setTemperature({temp, fan, mode, power})
    }, [temp, fan, mode, power]);

    const clickTemp = (direction) => {
        if (direction === 'up'){
           return setTemp(temp + 1);
        }
        return setTemp(temp - 1);
    };

    return (
        <Fragment>
            <div className="temperature-control">
                <div>
                    {temp}
                </div>
                <div id="temperature-buttons">
                    <button className={`btn tight`} onClick={() => clickTemp('up')} >
                        <FontAwesomeIcon icon={faChevronUp} />
                    </button>
                    <button className={`btn tight`} onClick={() => clickTemp('down')} >
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                </div>
            </div>
            <div className="temperature-control">
                <RemoteControlMode mode={mode} click={setMode}/>
            </div>
            <div className="temperature-control">
                <button className={`btn`} onClick={clickPower} >
                    <FontAwesomeIcon icon={faPowerOff}/>
                </button>
                <button className={`btn fan_${fan}`} onClick={clickFan} >
                    <FontAwesomeIcon icon={faFan}/> {fan === 4 && <span>auto</span>}
                </button>
            </div>
        </Fragment>
    );
};

export default RemoteControl;
