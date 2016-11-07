import React from 'react';
import { render } from 'react-dom';

import Header from '../views/components/Header';
import ImageContainer from '../views/containers/ImageContainer';
import UploaderContainer from '../views/containers/UploaderContainer';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const routes = (
    <Router history={browserHistory}>
          <Route path='/' component={Header}>
            <IndexRoute component={ImageContainer}/>
            <Route path='/uploader' component={UploaderContainer} />
            <Route path='/events/:group' component={UploaderContainer}/>
          </Route>
    </Router>
);

export default routes;
