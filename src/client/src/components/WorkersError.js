import React from 'react';

const WorkersError = (props) => {
    const { workersError } = props;
    if (workersError) {
        return (
            <div className="column col-4 col-xs-12">
                <div className="card text-center">
                    <div className="card-header has-error">
                        <span className="label label-primary label-error">
                            Whoops Couldn't Fetch Workers
                        </span>
                    </div>
                    <div className="card-body">
                        The Error Message Was: {workersError}
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default WorkersError;