var React = require('react'),
    ReactRouter = require('react-router'),
    IndexLink = ReactRouter.IndexLink;

var Home = React.createClass({
    render: function() {
        return (
            <div className="container" >
                <div className="header">
                    <div className="link-home">
                        <IndexLink to="/" className="link"></IndexLink>
                        <span className="link-text"> Home </span>
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
});

module.exports = Home;
