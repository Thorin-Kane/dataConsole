var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var GroupContainer = require('../containers/GroupContainer');
var EventContainer = require('../containers/EventContainer');
var Home = require('../components/Home');

var routes = (
  <Router history={hashHistory}>
      <Route path='/' component={Home}>
        <IndexRoute component={GroupContainer}/>
        <Route path='/events/:group' component={EventContainer}/>
      </Route>
  </Router>
);

module.exports = routes;
