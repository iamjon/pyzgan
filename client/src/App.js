import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button } from 'react-bootstrap';
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
          <main role = "main" className = "container" >

            <div class = "starter-template">
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formBasicChecbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>


            </div>

            </main>



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
