import React from 'react';

const WorkersSalary = (props) => {
    const { workersSalary, showSalary, showFunction } = props;
    if (showSalary) {
        return (
            <p>
                Average Worker Salary is: {workersSalary}
            </p>
        );
    }
    return (
        <button className="btn btn-primary" onClick={showFunction}>
            Show Salary
        </button>
    );
};

export default WorkersSalary;