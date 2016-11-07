import React from 'react';
import { Link, IndexLink } from 'react-router';

class Header extends React.Component {
    render() {
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
};

export default Header;
