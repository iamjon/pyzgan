import './App.css';
import 'spectre.css';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import getWorkersAction from './actions/WorkerActions';
import WorkersError from './components/WorkersError';
import WorkersFetch from './components/WorkersFetch';
import WorkersDetails from './components/WorkersDetails';

class App extends Component {
    constructor(props) {
        super(props);
        this.fetchWorkers = this.fetchWorkers.bind(this);
        this.state = {
            data: [],
        };
    }

    fetchWorkers() {
        const { getWorkers } = this.props;
        getWorkers();
    }


    render() {
        const { fetchWorkers, props } = this;
        const { workersAge, workersSalary, workersLoading, workersError, workers } = props;
        return (
                <div className="section section-hero bg-gray">
                    <div className="grid-hero container grid-lg text-center" id="overview">

                        <h1>Get Workers</h1>
                        <div className="columns">
                            <div className="column col-4 col-xs-12"></div>
                            <WorkersError workersError={workersError}/>
                            <WorkersFetch
                                workersError={workersError}
                                workersLoading={workersLoading}
                                fetchWorkers={fetchWorkers}
                            />
                            <WorkersDetails
                                hide={workersError || workersLoading || workers.length === 0}
                                workersError={workersError}
                                workersSalary={workersSalary}
                                workersAge={workersAge}
                            />
                            <div className="column col-4 col-xs-12"></div>
                        </div>
                    </div>
                </div>

        );
    }
}





const mapStateToProps = state => ({
    workers: state.workers.workers,
    workersAge: state.workers.workersAge,
    workersSalary: state.workers.workersSalary,
    workersLoading: state.workers.workersLoading,
    workersError: state.workers.workersError,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getWorkers: getWorkersAction
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(App);
