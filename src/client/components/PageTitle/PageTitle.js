import React from 'react';

const PageTitle = ({ title, desc }) => {
  return (
    
    <section className="js-parallax u-promo-block u-promo-block--mheight-500 u-overlay u-overlay--dark text-white" 
    >
    <div className="container u-overlay__inner u-ver-center u-content-space">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="text-center">
            <h1 className="display-sm-4 display-lg-3">{title}</h1>
            <p className="h6 text-uppercase u-letter-spacing-sm mb-0">{desc}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default PageTitle;
