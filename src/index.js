import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
  } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
  import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import './client/styles/steam.css';
import './client/index.css';
//import App from './client/App';
import * as serviceWorker from './client/serviceWorker';

import rootReducer from './client/store/reducers';

import Header from './client/components/Header/Header';
import MyToast from './client/components/MyToast';

import Home from './client/pages/Home';
import Students from './client/pages/Students';
import Services from './client/pages/Services';
import Solutions from './client/pages/Solutions';

import Error from './client/pages/Error';
import { menuAll } from './client/constants/Menu';
const Root = () => {
    //
    const initialState = {};
  
    const store = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(thunk),
        (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
          compose,
      ),
    );
    return (
      <Router>
        <Provider store={store}>
        <Header
        nav={menuAll}
        identity={"identity"}
        avatar_url={"avatar_url"}
        name={"name"}
        setDialog={"setDialog"}
        appConfig={"appConfig"}
      />
          <Container className="m-0 p-0 margin-top" fluid>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/page/:id" exact component={Students} />
              <Route path="/services" exact component={Services} />
              <Route path="/solutions" exact component={Solutions} />
              <Route path="/portfolio" exact component={Students} />
              
              <Route path="/blog" exact component={Students} />
              <Route path="/error" component={Error} />
              <Route exact path="/">
                <Redirect to="/" />
              </Route>
              <Redirect to="/error" />
            </Switch>
            <MyToast />
          </Container>
        </Provider>
      </Router>
    );
  };
  
ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
