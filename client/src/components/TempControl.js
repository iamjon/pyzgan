import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

const TempControl = ({clickTemp, temp}) => {
    return (
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
    );
};

export default TempControl;
