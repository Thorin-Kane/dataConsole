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
        this._handleNewUpload = this._handleNewUpload.bind(this);
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
        console.log('header unmounting');
    }

    _handleNewUpload() {
        $('#upload-container').show();
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
                        <Link to="/assets" className="link" activeClassName="active"></Link>
                        <span className="link-text"> Asset Library </span>
                    </div>
                    <div className='upload-btn-container'>
                        <button className='new-upload-btn' onClick={this._handleNewUpload}>
                            <span className='upload-image'></span>
                        </button>
                    </div>
                </div>
                <div className='page'>
                    {this.props.children}
                </div>
            </div>
        )
    }
};

