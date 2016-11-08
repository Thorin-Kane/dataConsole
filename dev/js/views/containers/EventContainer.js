var React = require('react'),
    Events = require('../components/EventTile'),
    NewItem = require('../components/NewItem');

var EventContainer = React.createClass({
    getInitialState: function() {
        return {
            isLoading: true,
            data: {},
            schema: {}
        }
    },
    handleDelete: function (event) {
        $.ajax({
            url: 'http://localhost:8080/api/data/events/' + this.props.location.state.group._id + '/' + event._id,
            dataType: 'html',
            type: 'DELETE',
            success: function () {
                var data = this.state.data;
                //optimistically remove deleted item from list
                for(var i =0; i < data.events.length; i++){
                    if(data.events[i]._id == event._id) {
                        data.events.splice(i, 1);
                    }
                }
                this.setState({
                    data: data
                });
                console.log("Event Deleted");
            }.bind(this),
            error: function(xhr, status, err) {
                console.err('http://localhost:8080/api/data', status, err.toString());
            }.bind(this)
        });
    },
    handleSubmit: function(NewEvent) {
        $.ajax({
            url: 'http://localhost:8080/api/data/events/' + this.props.location.state.group._id,
            data: NewEvent,
            dataType: 'json',
            type: 'PUT',
            success: function (data) {
                this.setState({
                    data: data
                });
            }.bind(this)

        });
    },
    componentWillMount: function () {
        this.setState({
            data: this.props.location.state.group,
        });
        $.ajax({
            url: 'http://localhost:8080/api/schema',
            type:'GET',
            dataType: 'json',
            success: function (data) {
                this.setState({
                    schema: data[0],
                    isLoading: false
                });
            }.bind(this)
        });
    },
    render: function () {
        return(
            <div className="ev-container">
                <Events
                    schema={this.state.schema}
                    isLoading={this.state.isLoading}
                    group={this.state.data}
                    onDelete={this.handleDelete}/>
            </div>

        )
    }

});

module.exports = EventContainer;
