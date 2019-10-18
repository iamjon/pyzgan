import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faCircle, faPowerOff, faFan, faTemperatureLow } from '@fortawesome/free-solid-svg-icons'
import { faCircle as faRegularCircle } from '@fortawesome/free-regular-svg-icons'

const RemoteControl = () => {
    const [fan, setFan] = useState(1);

    const clickPower = () => {
        console.log('clickPower')
    };

    const clickFan = () => {
        if (fan < 4){
            return setFan(fan + 1);
        }
        return setFan(1);
    };

    return (
        <Fragment>
            <div className="temperature-control">
                <div className="kaki">
                    20
                </div>
                <div id="temperature-buttons">
                    <FontAwesomeIcon icon={faChevronUp} />
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>
            <div className="temperature-control">
                <FontAwesomeIcon icon={faCircle} />
                <FontAwesomeIcon icon={faRegularCircle} />
                <FontAwesomeIcon icon={faRegularCircle} />
            </div>
            <div className="temperature-control">
                <button className={`btn`} onClick={clickPower} >
                    <FontAwesomeIcon icon={faPowerOff}/>
                </button>
                <button className={`btn fan_${fan}`} onClick={clickFan} >
                    <FontAwesomeIcon icon={faFan}/> {fan === 4 && ` auto`}
                </button>
            </div>
        </Fragment>
    );
};

export default RemoteControl;
