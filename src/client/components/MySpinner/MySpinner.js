import React from 'react';

import './styles.css';

const MySpinner = ({ text, ...rest }) => {
  return (
    <div
      {...rest}
      className="spinner-container d-flex align-items-center justify-content-center"
    >
      <div className="book">
        <div className="book__page"></div>
        <div className="book__page"></div>
        <div className="book__page"></div>
      </div>
    </div>
  );
};

export default MySpinner;
