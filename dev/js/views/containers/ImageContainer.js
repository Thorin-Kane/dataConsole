import React from 'react';
import ImageLibrary from '../components/ImageLibrary';
import UploaderContainer from './UploaderContainer';
import constants from '../../helpers/constants';

export default class ImageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modified: false,
            data: [],
            isLoading: true
        }

        this._isModified = this._isModified.bind(this);
        this._handleRemove = this._handleRemove.bind(this);
    }

    componentDidMount() {
        fetch(constants.API_URL + 'images')
        .then(function (response) {
            if(response.status !== 200) {
                console.log("There was an error" + response.status);
                return;
            }

            return response.json()
        })
        .then(function (data) {
            this.setState({
                isLoading: false,
                data: data
            })
        }.bind(this))
        .catch(function (err) {
            console.log(err);
        })
    }

    _handleRemove(event) {
        //TODO Refactor into modular sections
        fetch(constants.API_URL + 'images/' + event._id, {
            method: 'delete'
        }).then(function (response) {
            return response.status;
        }).then(function (status) {
            fetch(constants.API_URL + 'upload/' + event.name, {
                method: 'delete'
            })
        }).then(function() {
            this._isModified(event._id);
        }.bind(this))
    }

    _isModified(id) {
        //optimistically remove image
        var data = this.state.data;
        for(var i = 0; i < data.length; i++) {
            if(data[i]._id == id) {
                data.splice(i, 1);
            }
        }
        this.setState({
            data: data
        });
    }

    render() {
        return (
            <div className='asset-page'>
                <ImageLibrary images={this.state.data} handleRemove={this.handleRemove}/>
                <UploaderContainer />
            </div>
        )
    }
};
