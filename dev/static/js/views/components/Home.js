var React = require('react'),
    ReactRouter = require('react-router'),
    IndexLink = ReactRouter.IndexLink;
    Link = ReactRouter.Link;

var Home = React.createClass({
    render: function() {
        return (
            <div className="container" >
                <div className="header">
                    <div className="link-home">
                        <IndexLink to="/" className="link" activeClassName="active"></IndexLink>
                        <span className="link-text"> Home </span>
                    </div>
                    <div className="link-home">
                        <Link to="/uploader" className="link" activeClassName="active"></Link>
                        <span className="link-text"> Uploader </span>
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
});

module.exports = Home;
