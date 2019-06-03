import React, { Component } from 'react';
import WorkersSalary from './WorkersSalary';

class WorkersDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { clicked: false };
        this.showFunction = this.showFunction.bind(this);
    }

    showFunction(){
        this.setState({clicked:true});
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.hide === true) {
            return {
                clicked: false
            };
        }
        return null;
    }

    render() {
        const {showFunction, state, props} = this;
        const { clicked } = state;
        const { hide , workersSalary, workersAge } = props;

        if (hide) {
            return null;
        }

        return (
            <div className="column col-4 col-xs-12">
                <div className="card text-center">
                    <div className="card-header"></div>
                    <div className="card-body">
                        <p>Average age of the employees is {workersAge}</p>
                        <WorkersSalary showFunction={showFunction} showSalary={clicked} workersSalary={workersSalary} />
                    </div>
                </div>
            </div>

        );
    }
}

export default WorkersDetails;