import React, { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faPowerOff, faFan } from '@fortawesome/free-solid-svg-icons'
import RemoteControlMode from './RemoteControlMode';
import { setTemperature } from '../api';

const RemoteControl = ({power:dpower, temp:dtemp, fan:dfan, mode:dmode}) => {
    const [power, setPower] = useState(dpower);
    const [temp, setTemp] = useState(dtemp);
    const [fan, setFan] = useState(dfan);
    // cool heat fan
    const [mode, setMode] = useState(dmode);

    const clickPower = () => {
        return setPower(!power);
    };

    const clickFan = () => {
        if (fan < 4){
            return setFan(fan + 1);
        }
        return setFan(1);
    };

    const clickTemp = (direction) => {
        if (direction === 'up'){
            return setTemp(temp + 1);
        }
        return setTemp(temp - 1);
    };

    useEffect(() => {
        setTemperature({temp, fan, mode, power})
    }, [temp, fan, mode, power]);


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
