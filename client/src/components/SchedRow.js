import React, { useState } from 'react';
import Command from './Command';
import moment from 'moment';
import Popup from 'reactjs-popup';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RemoteStatusContext } from '../helpers/RemoteStatusContext';
import {InputMoment} from 'react-input-moment';

import "react-input-moment/css/input-moment.min.css";
import RepeatingEvent from './RepeatingEvent';


const SchedRow = (props) => {
    const weekDays = moment.weekdays();
    const { command = {}, when = {}, date: ddate = {}, killItem, index, selected, selectItem, which, setItem} = props;

    const [date, setDate] = useState(moment(ddate).isValid() ? moment(ddate) : moment());
    const [event, setEvent] = useState((which === 'scheduled')? {command, when} : {command, date});

    const DateTrigger = () => {
      return(
          <button className="date-close tight">
              {date.format('LLLL')}
          </button>
      );
    };

    const RepeatEventTrigger = () => {
        const {when = {}} = event;
        const {hour, minute, dayOfWeek = 0} = when;
        return(
            <button className="date-close tight">
                Every {weekDays[dayOfWeek]}, @ {hour}:{minute}
            </button>
        );
    };

    const CommandTrigger = () => {
        const { command = {} } = event;
        const { temp, fan, mode, power } = command;
        let pstring = (power === true)? 'On' : 'Off';
        if (power === undefined) {
            pstring = '';
        }
        return(
            <button className="date-close tight">
                temp {temp}, fan {fan}, mode {mode}, power {pstring}
            </button>
        );
    };

    const CommandClick = (vals) => {
        const e = {
            ...event,
            date,
        };

        if (!e.command){
            e.command = {};
        }

        vals.forEach(o=> e.command[o.key] = o.value);

        if (which !== 'oneTime') {
            delete e.date;
        }

        setEvent(e);
        setItem(which, event, index);
    };

    const RepeatingClick = (val) => {
        const e = {
            ...event,
            when: val,
        };
        setEvent(e);
    };

    const DateClick = (moment) => {
        const e = {
            ...event,
        };

        e.date = moment;

        setDate(moment);
        setEvent(e);
    };

    return (
        <tr className="sched-row">
            <td className="sched-cell">
                <button className={`btn vtight`} onClick={() => selectItem(which, index)} >
                    {!selected && <FontAwesomeIcon icon={faSquare} />}
                    {selected && <FontAwesomeIcon icon={faCheckSquare} />}
                </button>
            </td>
            {which === 'oneTime' && (
                <td className="sched-cell">
                    <Popup trigger={DateTrigger} modal close className="custom-pop">
                        {close => (
                            <div className="modal width-block">
                                <div className="content">
                                    <InputMoment
                                        moment={date}
                                        onChange={DateClick}
                                        showSeconds={false}
                                        locale="en"
                                    />
                                    <button  className="date-close" onClick={() => close()}>
                                        <FontAwesomeIcon icon={faCheck} /> Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </Popup>
                </td>
            )}
            {which === 'scheduled' && (
                <td className="sched-cell">
                    <Popup trigger={RepeatEventTrigger} modal close className="custom-pop">
                        {close => (
                            <div className="modal width-block">
                                <div className="content">
                                    <RepeatingEvent when={when} command={command} onClose={close} sync={RepeatingClick}/>
                                </div>
                            </div>
                        )}
                    </Popup>
                </td>
            )}
            <td className="sched-cell">
                <Popup trigger={CommandTrigger} modal close className="custom-pop">
                    {close => (
                        <div className="modal width-block">
                            <div className="content">
                                <RemoteStatusContext.Consumer>
                                    {value => (<Command onClose={close} sync={CommandClick} remoteStatus={value}/>)}
                                </RemoteStatusContext.Consumer>
                            </div>
                        </div>
                    )}
                </Popup>
            </td>
            <td className="sched-cell">
                <button className={`btn vtight`} onClick={() => killItem(which, index)} >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </td>
        </tr>
    );
};

export default SchedRow;
