import React from 'react';
import { render } from 'react-dom';

import ImageContainer from '../views/containers/ImageContainer';
import UploaderContainer from '../views/containers/UploaderContainer';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { Provider } from 'react-redux';
import store , { history } from './store';

const routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
              <Route path='/' component={App}>
                <IndexRoute component={ImageContainer}/>
                <Route path='/uploader' component={UploaderContainer} />
                <Route path='/events/:group' component={UploaderContainer}/>
              </Route>
        </Router>
    </Provider>
);

export default routes;
