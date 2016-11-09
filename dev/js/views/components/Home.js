import React from 'react';
import State from '../../helpers/state';
import {IndexLink, Link } from 'react-router';
import data from '../../data/events.json';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.store = State.getInstance();
        this.state = {};

        this._setItems = this._setItems.bind(this);
    }

    componentWillMount() {
        this.store.set('data', data);
        console.log(this.store);
        this.unsubscribe = this.store.subscribe('data', this._setItems);
    }

    _setItems() {
        console.log('set items');
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

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

