import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, } from '@fortawesome/free-solid-svg-icons';
import { faCircle as faRegularCircle } from '@fortawesome/free-regular-svg-icons';

const RemoteControlMode = (props) => {
    const { mode, click } = props;
    const coolColor = '#9EEFFB';
    const fanColor = '#F8F9E0';
    const heatColor = '#FF797F';

    return (
        <div className="temperature-control">
            <button className={`btn tight`} onClick={() => click('cool')}>
                {mode === 'cool' && (
                    <span className="fa-layers fa-fw">
                        <FontAwesomeIcon icon={faRegularCircle} color={coolColor}/>
                        <FontAwesomeIcon icon={faCircle} color={coolColor} transform="shrink-7"/>
                    </span>

                )}

                {mode !== 'cool' && (
                    <FontAwesomeIcon icon={faCircle} color={coolColor} />
                )}

            </button>
            <button className={`btn tight`} onClick={() => click('heat')}>
                {mode === 'heat' && (
                    <span className="fa-layers fa-fw">
                        <FontAwesomeIcon icon={faRegularCircle} color={heatColor}/>
                        <FontAwesomeIcon icon={faCircle} color={heatColor} transform="shrink-6"/>
                    </span>

                )}
                {mode !== 'heat' && (
                    <FontAwesomeIcon icon={faRegularCircle} color={heatColor}/>
                )}
            </button>
            <button className={`btn tight`} onClick={() => click('fan')}>
                {mode === 'fan' && (
                    <span className="fa-layers fa-fw">
                        <FontAwesomeIcon icon={faRegularCircle} color={fanColor}/>
                        <FontAwesomeIcon icon={faCircle} color={fanColor} transform="shrink-6"/>
                    </span>

                )}
                {mode !== 'fan' && (
                    <FontAwesomeIcon icon={faRegularCircle} color={fanColor}/>

                )}
            </button>
        </div>

    );
};

export default RemoteControlMode;
