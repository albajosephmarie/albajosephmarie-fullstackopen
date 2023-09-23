import React from 'react'; 
import './success.css';

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="success">
      {message}
    </div>
  );
};

export default SuccessNotification;