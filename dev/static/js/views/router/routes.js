var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var UploaderContainer = require('../containers/UploaderContainer');
var ImageContainer = require('../containers/ImageContainer');
var Home = require('../components/Home');

var routes = (
  <Router history={hashHistory}>
      <Route path='/' component={Home}>
        <IndexRoute component={ImageContainer}/>
        <Route path='/events/:group' component={UploaderContainer}/>
      </Route>
  </Router>
);

module.exports = routes;
