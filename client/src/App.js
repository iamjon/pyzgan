import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import getWorkersAction from './actions/WorkerActions';
import RemoteControl from './components/RemoteControl';


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
          <div class="container-fluid">
            <div class="row">
              <div class="col-12 p-0">
                <div class="jumbotron min-vh-100 text-center m-0  d-flex flex-column justify-content-center">
                  <RemoteControl/>
                </div>
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
