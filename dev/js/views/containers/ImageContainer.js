import React from 'react';
import ImageLibrary from '../components/ImageLibrary';
import UploaderContainer from './UploaderContainer';
import constants from '../../helpers/constants';
import State from '../../helpers/state';

export default class ImageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.store = State.getInstance();
        this.state = {
            modified: false,
            data: [],
            isLoading: true
        }

        this._setItems = this._setItems.bind(this);
        this._isModified = this._isModified.bind(this);
        this._handleRemove = this._handleRemove.bind(this);
    }

    componentWillMount() {
        this.unsubscribe = this.store.subscribe('images', this._setItems);
        fetch(constants.API_URL + 'images')
        .then(r => r.json())
        .then(data => {
            this.store.set('images', data);
        })
        .catch(e => console.log('error'))
    }

    componentDidMount() {
        // console.log(this.store);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    _setItems() {
        this.setState({
            isLoading: false,
            data: this.store.get('images')
        });
        console.log(this.store);
    }

    _handleRemove(event) {
        // //delete mongo entry
        fetch(constants.API_URL + 'images/' + event._id, {
            method: 'delete'
        }).then(function (response) {
            return response.status;
        }).then(function (status) {
            //delete file
            fetch(constants.API_URL + 'upload/' + event.name, {
                method: 'delete'
            })
        }).then(function() {
            this._isModified(event._id);
        }.bind(this))
    }

    _isModified(id) {
        let data = this.store.get('images');
        for(var i = 0; i < data.length; i++) {
            if(data[i]._id == id) {
                data.splice(i, 1);
            }
        }
        this.store.set('images', data);

    }

    render() {
        return (
            <div className='asset-page'>
                <ImageLibrary images={this.state.data} handleRemove={this._handleRemove}/>
                <UploaderContainer />
            </div>
        )
    }
};
