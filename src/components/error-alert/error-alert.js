import React from 'react';
import PropTypes from 'prop-types';
import './error-alert.css';
import { Alert } from 'antd';

export default function ErrorAlert({ message }) {
  const description = message === 'Failed to fetch' ? 'No internet connection' : 'Server error';

  return (
    <div className="error-alert-wrapper">
      <Alert
        className="error-alert"
        message="Error:"
        description={description}
        type="error"
        showIcon
      />
    </div>
  );
}

ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
};
