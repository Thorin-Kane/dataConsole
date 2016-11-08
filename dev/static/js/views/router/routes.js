'use strict';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import ImageContainer from'../containers/ImageContainer';
import Home from'../components/Home';
import MainContainer from '../containers/MainContainer';

export default class routes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router history={browserHistory}>
                <Route path='/' component={Home}>
                    <IndexRoute component={MainContainer} />
                    <Route path='/assets' component={ImageContainer} />
                </Route>
            </Router>
        );
    }
}
