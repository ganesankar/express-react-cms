import React from 'react';
import { connect } from 'react-redux';

import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';

const Footer = ({ nav }) => {
  const { navMenu, socialLinks } = nav;

  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="mb-5">
                <h3 className="footer-heading mb-4">About Revit</h3>
                <p>
                  Revit is what our tag in out college days where, we shared
                  laughter, tears, &amp; interesting lessons in life. Though,
                  this school is no more, we shall keep the memories alive by
                  sharing our fotos &amp; stories, &amp; by reconnecting with
                  each other.
                </p>
              </div>
            </div>
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="row mb-5">
                <div className="col-md-12">
                  <h3 className="footer-heading mb-4">Navigations</h3>
                </div>
                <div className="col-md-6 col-lg-6">
                  <Nav className="flex-column">
                    {navMenu.map((menu, i) => (
                      <LinkContainer
                        key={`footermenuLink${i}`}
                        to={menu.link}
                        className={`${menu.class}`}
                      >
                        <Nav.Link>{menu.title}</Nav.Link>
                      </LinkContainer>
                    ))}
                  </Nav>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="mb-5">
                <h3 className="footer-heading mb-4">Join Us</h3>

                <div>
                  <Nav className="flex-column">
                    {socialLinks.map((menu, i) => (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        key={`footermenuSocial${i}`}
                        href={menu.link}
                        className={`${menu.class}`}
                      >
                        {menu.title}
                      </a>
                    ))}
                  </Nav>
                </div>
              </div>
            </div>
          </div>
          <div className="row pt-5 mt-5 text-center">
            <div className="col-md-12">
              <p>
                Copyright &copy; 2020 All rights reserved <br /> Revit'08
                Community{' '}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default connect((state) => ({}), {})(Footer);
