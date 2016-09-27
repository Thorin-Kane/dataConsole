var React = require('react'),
	ReactDOM = require('react-dom'),
	routes = require('./router/routes');

ReactDOM.render(
	routes, 
	document.getElementById('content')
);