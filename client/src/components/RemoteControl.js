import React, { Component } from 'react';
import { InputGroup, FormControl, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import WorkersSalary from './WorkersSalary';

class RemoteControl extends Component {
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
          <div class="form-row">
            <div class="form-group bg-light col-md-3 mx-auto">
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <Button variant="outline-secondary">Up</Button>
                </InputGroup.Prepend>
                 <FormControl plaintext readOnly aria-describedby="basic-addon1" />
                <InputGroup.Append>
                  <Button variant="outline-secondary">Down</Button>
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
              <InputGroup className="mb-3">
              <InputGroup.Prepend>
                  <Button variant="outline-secondary">Up</Button>
                  <DropdownButton
                      as={InputGroup.Prepend}
                      variant="outline-secondary"
                      title="Dropdown"
                      id="input-group-dropdown-1"
                    >
                      <Dropdown.Item href="#">Action</Dropdown.Item>
                      <Dropdown.Item href="#">Another action</Dropdown.Item>
                      <Dropdown.Item href="#">Something else here</Dropdown.Item>
                      <Dropdown.Item href="#">Separated link</Dropdown.Item>
                    </DropdownButton>
                </InputGroup.Prepend>

                <InputGroup.Append>
                  <Button variant="outline-secondary">Down</Button>
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>


              </div>
            </div>
        );
    }
}

export default RemoteControl;
