import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {

    renderField() {
        return formFields.map((field, i) => {
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
                    onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
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

function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    formFields.forEach(field => {
        if (!values[field.name]) {
            errors[field.name] = `You must provide ${field.name === 'recipients' ? 'recipients' : 'a ' + field.name}`;
        }
    });

    return errors;
};

export default reduxForm({
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);