var React = require('react'),
    PropTypes = React.PropTypes;

var Tile = React.createClass({
    render: function () {
        return (
            <div className="ev-main-tile">
               <section className=" ev-main-content" >
                    <div className="ev-region-title">
                        <h3 className="ev ev-date"> {this.props.events.dateStart} </h3>
                        <h3 className="ev ev-title"> {this.props.events.title} </h3>
                    </div>
                    <div className="ev-region-location">
                        <h3 className="ev ev-building"> {this.props.events.building} </h3>
                        <h3 className="ev ev-room"> {this.props.events.room} </h3>
                    </div>
                </section>
                <section className="ev-region-footer">
                    <div className="ev-actions">
                        <button type="button" className="ev-btn-remove" onClick={this.props.handleClick}>
                            <span className="glyphicon glyphicon-remove"></span> Remove
                        </button>
                    </div>
                </section>
            </div>
        )
    }
});

function TileRow (props) {
    return (
        <div className="ev-tile-row">
            {props.group.events.map(function(events, i) { 
                if (events !== null) {
                    if(events._id !== null) {
                        return (
                            <Tile events={events} key={events._id} handleClick={props.onDelete.bind(null, events)}/> 
                        )
                    }
                }   
            })}
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
                    <TileRow group={this.props.group} schema={this.props.schema} onDelete={this.props.onDelete}/>   
                </div>}
            </div>
        )
    }
});

module.exports = Event;
