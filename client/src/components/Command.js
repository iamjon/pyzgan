import React, { useState } from 'react';
import Switch from "react-switch";
import TempControl from './TempControl';
import RemoteControlMode from './RemoteControlMode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Command = ({remoteStatus, sync, onClose}) => {
    const {temp: dtemp, fan: dfan, mode: dmode, power:dpower} = remoteStatus;
    const [power, setPower] = useState(dpower);
    const [temp, setTemp] = useState(dtemp);
    const [mode, setMode] = useState(dmode);
    const [fan, setFan] = useState(dfan);

    const clickTemp = (direction) => {
        if (direction === 'up'){
            setTemp(temp + 1);
        } else {
            setTemp(temp - 1);
        }
    };
    
    const changeHandler = (which, value) => {
        switch(which) {
            case 'fan':
                setFan(value);
                break;
            case 'mode':
                setMode(value);
                break;
            case 'power':
                setPower(value);
                break;
            default:
                return;
        }
    };


    const setAll = () => {
        const vals =[
            {key:'fan', value:fan},
            {key:'mode',value:mode},
            {key:'power', value:power},
            {key:'temp', value:temp}
        ];

        sync(vals);
        onClose();
    };

    return (
        <div className="command-container">
            <div className="command-item">
                <Switch onChange={(value) => changeHandler('power', value)} checked={power} />
            </div>
            <div className="command-item">
                <div className="form-group">
                    <select value={fan} onChange={(e) => changeHandler('fan', e.target.value )} className="form-control">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">Auto</option>
                    </select>
                </div>
            </div>
            <div className="command-item">
                <RemoteControlMode mode={mode} click={(value) => changeHandler('mode', value )}/>
            </div>
            <div className="command-item">
                <TempControl clickTemp={clickTemp} temp={temp} />
            </div>
            <button  className="date-close" onClick={() => setAll()}>
                <FontAwesomeIcon icon={faCheck} /> Close
            </button>
        </div>
    );
};

export default Command;
