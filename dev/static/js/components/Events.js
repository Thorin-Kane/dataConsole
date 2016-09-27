var React = require('react'),
    PropTypes = React.PropTypes;

function EventItem (props) {
    return (
        <tr className="list-item-container">
            <td>{props.events.title} </td>
            <td>{props.events.presenter} </td>
            <td>{props.events.dateStart} </td>
            <td>{props.events.dateEnd} </td>
            <td>{props.events.startTime} </td>
            <td>{props.events.endTime} </td>
            <td>{props.events.building} </td>
            <td>{props.events.room} </td>
            <td>{props.events.description} </td>
            <td>{props.events.backgroundImage} </td>
            <td>
                <button type="button" className="ev-btn-remove" onClick={props.handleClick}>
                    <span className="glyphicon glyphicon-remove"></span> Remove
                </button>
            </td>
        </tr>
    )
};
function EventColumnTitle(props) {
    return (
        <tr>
            {props.schema.SubGroupProperties.map(function (property, i) {
                return (
                    <th key={property._id} > {property.label} </th>
                )
            })}
            <th> Background Image </th>
        </tr>
    )
};

function EventList (props) {
    return (
        <div className="panel panel-default col-md-12">
            <table className="table">
                <thead className="panel-heading">
                    <EventColumnTitle schema={props.schema}/>
                </thead>
                <tbody className="list-group">
                    {props.group.events.map(function(events, i) { 
                        if (events !== null) {
                            if(events._id !== null) {
                                return (
                                    <EventItem events={events} key={events._id} handleClick={props.onDelete.bind(null, events)}/> 
                                )
                            }
                        }   
                    })}
                </tbody>
            </table>
        </div>
    )
};

var Event = React.createClass({
    render: function() {
        return (
            <div>
                {this.props.isLoading == true
                ? <h1> Loading </h1>
                :
                <div className="row">
                    <EventList group={this.props.group} schema={this.props.schema} onDelete={this.props.onDelete}/>   
                </div>}
            </div>
        )
    }
});

module.exports = Event;
