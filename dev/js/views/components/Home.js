import React from 'react';

import {IndexLink, Link } from 'react-router';

export default class Home extends React.Component {
    render() {
        return (
            <div className="container" >
                <div className="header">
                    <div className="link-home">
                        <IndexLink to="/" className="link" activeClassName="active"></IndexLink>
                        <span className="link-text"> Home </span>
                    </div>
                    <div className="link-home">
                        <Link to="/upload" className="link" activeClassName="active"></Link>
                        <span className="link-text"> Uploader </span>
                    </div>
                     <div className="link-home">
                        <Link to="/assets" className="link" activeClassName="active"></Link>
                        <span className="link-text"> Asset Library </span>
                    </div>
                </div>
                <div className='page'>
                    {this.props.children}
                </div>
            </div>
        )
    }
};

