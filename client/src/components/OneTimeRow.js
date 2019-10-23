import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons'

import Command from './Command';

const OneTimeRow = (props) => {
    const { killItem, index, selected, selectItem} = props;
    const [startDate, setStartDate] = useState(new Date());

    return (
        <tr>
            <td>
                <button className={`btn vtight`} onClick={() => selectItem('oneTime', index)} >
                    {!selected && <FontAwesomeIcon icon={faSquare} />}
                    {selected && <FontAwesomeIcon icon={faCheckSquare} />}
                </button>
            </td>
            <td>
                DatePickeWillGoHere
            </td>
            <td>
                <Command/>
            </td>
            <td>
                <button className={`btn vtight`} onClick={() => killItem('oneTime', index)} >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </td>
        </tr>
    );
};

export default OneTimeRow;
