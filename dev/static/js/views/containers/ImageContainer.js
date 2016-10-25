var React = require('react'),
    PropTypes = React.PropTypes,
    constants = require('../../helpers/constants'),
    ImageTile = require('../components/ImageTile');

function RemoveImageEntry (id) {
   
};

function RemoveImageFile (name) {
    
}
var ImageContainer = React.createClass({
    getInitialState: function() {
        return {
            modified: false,
            data: [],
            isLoading: true
        }
    },
    componentDidMount: function () {
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
    },
    handleRemove: function (event) {
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
            this.Modified(event._id);
        }.bind(this))
    },
    Modified: function (id) {
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
    },
    render: function() {
        return (
            <ImageTile images={this.state.data} handleRemove={this.handleRemove}/>
        )
    }
});

module.exports = ImageContainer;
