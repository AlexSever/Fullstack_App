import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';

const FIELDS = [
    { label:"Survey Title", name:"title"    },
    { label:"Subject Line", name:"subject"  },
    { label:"Email Body", name:"body"       },
    { label:"Recipient List", name:"emails" }
];

class SurveyForm extends Component {

    renderField() {
        return FIELDS.map((field, i) => {
            return (
                <Field
                    key={i}
                    label={field.label}
                    type="text"
                    name={field.name}
                    component={SurveyField}
                />
            );
        });
    }

    render() {
        return (
            <div>
                <form
                    // receive handleSubmit method from reduxForm
                    onSubmit={this.props.handleSubmit(values => console.log(values))}
                >
                    {this.renderField()}
                    <Link
                        to="/surveys"
                        className="red btn-flat white-text"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="teal btn-flat right white-text"
                    >
                        Next
                        <i className="material-icons right">
                            done
                        </i>
                    </button>
                </form>
            </div>
        );
    }
}

const validate = (values) => {
    const errors = {};

    FIELDS.forEach(field => {
        if (!values[field.name]) {
            errors[field.name] = `You must provide ${field.name === 'emails' ? 'emails' : 'a ' + field.name}`;
        }
    });

    return errors;
};

export default reduxForm({
    validate: validate,
    form: 'surveyForm'
})(SurveyForm);