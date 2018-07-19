import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import './FormExample.css';
export default class FormExample extends React.Component {
    constructor(props, context) {
        super(props, context);

        //   this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: ''
        };
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }

    render() {
        return (
            <form>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                >
                    <ControlLabel>Search Album here: </ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="Search"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>Validation is based on string length.</HelpBlock>
                </FormGroup>
            </form>
        );
    }
}
