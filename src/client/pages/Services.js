import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import PageTitle from "../components/PageTitle/PageTitle";
import ServiceCard from "../components/Feature/serviceCard";

import MySpinner from "../components/MySpinner";

import { loadServices } from "../store/actions/services";
import { setPageToLoad } from "../store/actions/header";

const Services = ({
  services: { isLoading, services, hasMoreItems, error },
  loadServices,
  header,
  setPageToLoad,
}) => {
  // did mount

  useEffect(() => {
    loadServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //console.log(Students);
  if (error) return <Redirect to={"/error"} />;
  if (isLoading) return <MySpinner key={0} text={"Loading..."} />;
  // console.log('Students', students);

  return (
    <Fragment>
      <PageTitle title="services" desc="services" />
      <section className="border-bottom py-3">
        <div className="container text-center">
          <p className="mb-0">
            <span className="badge badge-primary badge-pill mr-2">New</span> We
            are offering free quotation for any type of projects,{" "}
            <a href="contacts.html">request a free quote!</a>
          </p>
        </div>
      </section>
      <section className="u-content-space-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center mb-5 mb-lg-0 pr-lg-5">
              <header className="mb-5">
                <h2 className="h1">Our Product</h2>
                <p className="h5">
                  Convert more visitors, and win more business with Stream - UI
                  Kit.
                </p>
              </header>

              <p className="mb-4">
                Easy and fast adjustments of elements are possible with Front
                template. Find our more about our all-in-one programmatic
                template. We help to take of all the paperwork.
              </p>

              <a className="mr-4" href="#!">
                <i className="fab fa-google-play mr-1"></i> Google Play
              </a>
              <a href="#!">
                <i className="fab fa-app-store-ios mr-1"></i> App Store
              </a>
            </div>

            <div className="col-lg-6 align-self-center">
              <div className="u-device mx-auto"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light u-content-space">
        <div className="container">
          <header className="text-center w-md-50 mx-auto mb-8">
            <h2 className="h1">Features</h2>
            <p className="h5">
              Stream creative technology company providing key digital services
              for everyone.
            </p>
          </header>

          <Row className="mb-1">
            {services &&
              services.map((user, i) => (
                <ServiceCard user={user.data} key={i} />
              ))}
          </Row>
          <hr className="my-8" />
        </div>
      </section>
      <Container className="pt-4"></Container>

      {!error && !hasMoreItems && (
        <Row className="mb-2">
          <Col>
            <h4 className="text-center">No services</h4>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default connect(
  (state) => ({
    services: state.servicesReducer,
    header: state.headerReducer,
  }),
  { loadServices, setPageToLoad }
)(Services);
