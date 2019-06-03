import React from 'react';

const WorkersFetch = (props) => {
    const { workersError, workersLoading, fetchWorkers } = props;
    if (!workersError) {
        return (
            <div className="column col-4 col-xs-12">
                <div className="card text-center">
                    <div className="card-header"></div>
                    <div className="card-body">
                        <button className="btn btn-primary" disabled={workersLoading} onClick={fetchWorkers}>
                            Refresh
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default WorkersFetch;