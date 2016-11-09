'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Home from'../views/components/Home';
import ImageContainer from'../views/containers/ImageContainer';
import UploaderContainer from '../views/containers/UploaderContainer';
import ProjectDetail from '../views/containers/Project-Detail-Container';
import MainContainer from '../views/containers/MainContainer';

export default class routes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router history={browserHistory}>
                <Route path='/' component={Home}>
                    <IndexRoute component={MainContainer} />
                    <Route path='/upload' component={UploaderContainer} />
                    <Route path='/assets' component={ImageContainer} />
                    <Route path='/project/:project_id' component={ProjectDetail}/>
                </Route>
            </Router>
        );
    }
}
