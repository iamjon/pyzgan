import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare,  } from '@fortawesome/free-regular-svg-icons'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

import OneTimeRow from './OneTimeRow';
import { isEmpty } from '../helpers';

const Schedule = ({ oneTime: iOneTime, scheduled: iScheduled }) => {
    const [oneTime, setOneTime] = useState([]);
    const [oneTimeSelected, setOneTimeSelected] = useState({});
    const [scheduledSelected, setScheduledSelected] = useState({});
    const [scheduled, setScheduled] = useState([]);

    const addItem = (which) => {
        if (which === 'oneTime'){
            setOneTime([
                ...oneTime,
                {}
            ]);
        } else {
            setScheduled([
                ...scheduled,
                {}
            ]);
        }
    };

    const killItem = (which, index) => {
        const arr = (which === 'oneTime') ? [...oneTime] : [...scheduled];
        arr.splice(index, 1);
        if (which === 'oneTime'){
            setOneTime(arr);
        } else {
            setScheduled(arr);
        }

        const temp = (which === 'oneTime') ? {...oneTimeSelected} : {...scheduledSelected};

        if (temp[index]){
            delete temp[index];
             if (which === 'oneTime') {
                 setOneTimeSelected(temp)
             } else {
                 setScheduledSelected(temp)
             };
        }
    };

    const killSelected = (which) => {
        const object = (which === 'oneTime') ? oneTimeSelected : scheduledSelected;
        const objectSelected = (which === 'oneTime') ? setOneTimeSelected : setScheduledSelected;
        const objectSet = (which === 'oneTime') ? setOneTime : setScheduled;
        const target = (which === 'oneTime') ? oneTime : scheduled;

        if (object.all){
            objectSet([]);
            objectSelected({});
        } else {
            const indexes = Object.keys(object);
            const objectSelectedTemp = {...objectSelected};
            const newArray = target.filter((item, index) => !indexes.includes(index.toString()));
            indexes.forEach(index => delete objectSelectedTemp[index]);
            objectSelected(objectSelectedTemp);
            objectSet(newArray);
        }
    };

    const selectItem = (which, index, all) => {
        if (all) {
            return (which === 'oneTime') ? setOneTimeSelected({all:true}) : setScheduledSelected({all:true});
        }

        if (all === false) {
            return (which === 'oneTime') ? setOneTimeSelected({}) : setScheduledSelected({});
        }

        const temp = (which === 'oneTime') ? {...oneTimeSelected} : {...scheduledSelected};

        if (temp[index]){
            delete temp[index];
        } else {
            temp[index] = true;
        }

        return (which === 'oneTime') ? setOneTimeSelected(temp) : setScheduledSelected(temp);
    };

    useEffect(() => {
        setOneTime(iOneTime);
        setScheduled(iScheduled);
    }, [iOneTime, iScheduled]);

    return (
        <div className="schedule">
            <div>
                Add one time event
                <table className="schedule-table">
                    <thead>
                    <tr>
                        <th scope="col">
                                <button disabled={oneTime.length === 0} className={`btn vtight`} onClick={() => selectItem('oneTime', null, !oneTimeSelected.all)} >
                                    {oneTimeSelected.all && <FontAwesomeIcon icon={faCheckSquare} />}
                                    {!oneTimeSelected.all && <FontAwesomeIcon icon={faSquare} />}
                                </button>
                        </th>
                        <th scope="col">
                            Date
                        </th>
                        <th scope="col">
                            Command
                        </th>
                        <th scope="col">
                            <div className="action-buttons">
                                <button className={`btn vtight`} onClick={() => addItem('oneTime')} >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                {!isEmpty(oneTimeSelected) && (
                                    <button disabled={oneTime.length === 0} className={`btn vtight`} onClick={() => killSelected('oneTime')} >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                )}
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    { oneTime.map((event, index) =>  {
                        const eventParams = {
                            selectItem,
                            index,
                            key: index,
                            killItem,
                            selected: oneTimeSelected.all || oneTimeSelected[index],
                        };
                        return (<OneTimeRow {...eventParams} {...event} />)
                    }) }
                    </tbody>
                </table>
            </div>
            <div>
                Add Repeating Event
                <table className="schedule-table">
                    <thead>
                    <tr>
                        <th scope="col">
                            <FontAwesomeIcon icon={faSquare} />
                        </th>
                        <th scope="col">
                            Date
                        </th>
                        <th scope="col">
                            Command
                        </th>
                        <th>
                            <button className={`btn vtight`} onClick={() => addItem('sched')} >
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    { scheduled.map((event, index) =>  <OneTimeRow key={index} {...event} {...index}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Schedule;
