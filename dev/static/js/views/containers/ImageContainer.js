var React = require('react'),
    PropTypes = React.PropTypes,
    ImageTile = require('../components/ImageTile');

var ImageContainer = React.createClass({
    getInitialState: function() {
        return {
            data: [],
            isLoading: true
        }
    },
    componentDidMount: function () {
        $.ajax({
            url: 'http://localhost:8080/api/v1/images',
            type:'GET',
            dataType: 'json',
            success: function (data) {
                this.setState({
                    isLoading: false,
                    data: data
                });
            }.bind(this)
        });
    },
    render: function() {
        return (
            <ImageTile images={this.state.data}/>
        )
    }
});

module.exports = ImageContainer;
