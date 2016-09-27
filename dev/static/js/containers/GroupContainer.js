var React = require('react'),
    Group = require('../components/Group'),
    NewItem = require('../components/NewItem');

var isEmpty = function (data) {
    for( var prop in data) {
        if(data.hasOwnProperty(prop)) {
            return false;
        }
    }
    return true;
};
var GroupContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    
    getInitialState: function () {
        return {
            isLoading: true,
            schema: {},
            data: {}
        }
    },
    handleClick: function (group) {
        this.context.router.push({
            pathname: '/events/' + group._id,
            state: {
                group: group
            }
        });
    },
    componentWillMount: function () {
        $.ajax({
            url: 'http://localhost:8080/api/schema',
            type:'GET',
            dataType: 'json',
            success: function (data) {
                this.setState({
                    schema: data[0]
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.err('http://localhost:8080/api/schema', status, err.toString());
            }.bind(this)
        })
    },
    componentDidMount: function () {
        $.ajax({
            url: 'http://localhost:8080/api/data',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({
                    isLoading: false,
                    data: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.err('http://localhost:8080/api/data', status, err.toString());
            }.bind(this)
        });
    },
    handleSubmit: function (NewGroup) {
        //optimistically add new group
        $.ajax({
            url: 'http://localhost:8080/api/data',
            data: NewGroup,
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                var NewArray = this.state.data;
                NewArray.push(data);
                this.setState({
                    data: NewArray
                });
            }.bind(this)
        });
    },
    handleDelete: function (Groups) {
        $.ajax({
            url: 'http://localhost:8080/api/data/' + Groups._id,
            dataType: 'html',
            type: 'DELETE',
            success: function () {
                var data = this.state.data;
                //optimistically remove deleted item from list
                for(var i =0; i < data.length; i++){
                    if(data[i]._id == Groups._id) {
                        data.splice(i, 1);
                    }
                }
                this.setState({
                    data: data
                });
                console.log("Group Deleted");
            }.bind(this),
            error: function(xhr, status, err) {
                console.err('http://localhost:8080/api/data', status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="row">
                <div>
                    <h3 className="page-title">{this.state.schema.itemName}</h3>
                </div>
                <Group
                    onDelete={this.handleDelete} 
                    Groups={this.state.data}
                    schema={this.state.schema}
                    isLoading={this.state.isLoading}
                    handleClick={this.handleClick} />
            </div>
        )
    }
});

module.exports = GroupContainer;
