import React from 'react'; 
import './error.css';

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="error">
      {message}
    </div>
  );
};

export default ErrorNotification;