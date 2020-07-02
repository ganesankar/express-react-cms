import React from 'react';

const PageTitle = ({ title, desc }) => {
  return (
    <div className="site-blocks-cover inner-page-cover overlay">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-7 text-center">
            <h1 className="text-white">{title}</h1>
            <p> {desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
