import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ArticleCard from './../../components/Content/ArticleCard';
import MySpinner from './../../components/MySpinner';

import { loadArticles } from './../../store/actions/articles';
import { setPageToLoad } from './../../store/actions/header';


const Home = ({
  articles: { isLoading, articles, hasMoreItems, error },
  loadArticles,
  header,
  setPageToLoad,
}) => {
  // did mount
  useEffect(() => {
    loadArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getId(todo) {
    if (!todo.ref) {
      return null;
    }
    return todo.ref['@ref'].id;
  }

  console.log(articles);
  if (error) return <Redirect to={'/error'} />;
  if (isLoading) return <MySpinner key={0} text={'Loading...'} />;
  console.log('articles', articles);
  const today = new Date();
  const lastWd = '2004-06-02';
  //... units can be [seconds, minutes, hours, days, weeks, months, year
  const years = moment().diff(lastWd, 'years', false);
  const months = moment().diff(lastWd, 'months', false);
  const endOfMonth = moment(lastWd, 'YYYY-MM-DD').endOf('month');
  const days = moment().diff(lastWd, 'days', false);
  const daysd = moment().diff(endOfMonth, 'days', false);
  const starttoday = moment(today, 'YYYY-MM-DD').startOf('month');
  const thismonthdiff = moment().diff(starttoday, 'days', false);
  const dayos = days - daysd + thismonthdiff;

  return (
    <Fragment>
      <div className="site-blocks-cover bg-grouppic  overlay">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-7 text-center">
              <h1 className="mb-4">JJCET</h1>
              <h2 className="mb-4">
                INFORMATION TECHNOLOGY <br /> 2004 - 08 BATCH
              </h2>
              <span className=" text-center">
                <span className="since-left">
                  {years} <span>YEARS</span>
                </span>
                <span className="since-left">
                  {months % years} <span>MONTHS</span>
                </span>
                <span className="since-left">
                  {dayos > 30 ? dayos - 30 : dayos} <span>DAYS</span>
                </span>
              </span>
              <h6 className="mt-4 mb-4">SINCE JOURNEY STARTED...</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="site-section-heading text-center mb-5 w-border col-md-6 mx-auto">
              <h6>WELCOME TO</h6>
              <h2 className="mb-5"> the REvit'08 Community</h2>
              <p>Somebody Please give nice content</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Eveniet, fugit nam obcaecati fuga itaque deserunt officia, error
                reiciendis ab quod?
              </p>
            </div>
          </div>
          <div className="row">
           
          </div>
        </div>
      </div>
      <div className="site-section bg-dark">
        <div className="container">
          <div className="row">
            <div
              className="site-section-heading text-center mb-5 w-border col-md-6 mx-auto"
              data-aos="fade-up"
            >
              <h2 className="mb-5">News &amp; Events</h2>
              <p>Under Development</p>
            </div>
          </div>
          <div className="row">
            {articles &&
              articles.map((data, i) => (
                <div className="col-md-12  col-lg-4">
                  <ArticleCard
                    data={data.data}
                    ts={data.ts}
                    id={getId(data)}
                    key={getId(data)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      {error && (
        <Row className="mb-3">
          <Col>
            <h4 className="text-center">No articles</h4>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default connect(
  (state) => ({
    articles: state.articlesReducer,
    header: state.headerReducer,
  }),
  { loadArticles, setPageToLoad },
)(Home);
