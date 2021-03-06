import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import formFields from './formFields';

const SurveyReview = (props) => {

    const reviewFields = formFields.map((field, i) => {
        return (
            <div key={i}>
                <label>{ field.label }</label>
                <div>{ props.formValues[field.name] }</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            { reviewFields }
            <button
                className="yellow darken-3 white-text btn-flat"
                onClick={props.onCancel}
            >
                Back
            </button>
            <button
                className="green btn-flat right white-text"
                onClick={() => props.submitSurvey(props.formValues, props.history)}
            >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));