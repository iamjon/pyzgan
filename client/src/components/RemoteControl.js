import React, { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faFan } from '@fortawesome/free-solid-svg-icons'
import RemoteControlMode from './RemoteControlMode';
import { setTemperature } from '../api';
import TempControl from './TempControl';

const RemoteControl = ({power:dpower, temp:dtemp, fan:dfan, mode:dmode}) => {
    let defaultTemp = (dtemp > 30) ? 30 : dtemp;
    if (defaultTemp < 17) {
        defaultTemp = 17;
    }
    const [power, setPower] = useState(dpower);
    const [temp, setTemp] = useState(defaultTemp);
    const [fan, setFan] = useState(dfan);
    // cool heat fan
    const [mode, setMode] = useState(dmode);
    const [fireSync, setFireSync] = useState(false);

    const allowFire = () => {
        if (!fireSync){
            setFireSync(true);
        }
    };

    const clickPower = () => {
        allowFire();
        return setPower(!power);
    };

    const clickFan = () => {
        allowFire();
        if (fan < 4){
            return setFan(fan + 1);
        }
        return setFan(1);
    };

    const clickTemp = (direction) => {
        allowFire();
        if (direction === 'up' && (temp + 1) <= 30) {
            return setTemp(temp + 1);
        }

        if (direction === 'down' && (temp - 1) >= 17) {
            return setTemp(temp - 1);
        }

    };

    useEffect(() => {
        if (fireSync){
            setTemperature({temp, fan, mode, power})
        }
    }, [temp, fan, mode, power, fireSync]);


    return (
        <Fragment>
            <TempControl clickTemp={clickTemp} temp={temp} />
            <RemoteControlMode mode={mode} click={setMode}/>
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
