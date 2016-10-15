var React = require('react'),
    PropTypes = React.PropTypes;

function GroupColumnTitle(props) {
    return (
        <tr>
            <th>Group Name</th>
            <th>Background Color</th>
        </tr>
    )
};
function GroupItem (props) {
    return (
        <tr className="list-item-container" >
            <td onClick={props.handleClick}>
                {props.Group.name} 
            </td>
            <td>
                {props.Group.backgroundColor}
            </td>
            <td>
                <button type="button" className="btn btn-default btn-md pull-right" onClick={props.handleDelete}>
                    <span className="glyphicon glyphicon-remove"></span> Remove
                </button>
            </td>
        </tr>
    )
};
function GroupList (props) {
    return (
        <div className="panel panel-default col-md-12">
            <table className="table">
                <thead className="panel-heading">
                    <GroupColumnTitle/>
                </thead>
                <tbody className="list-group">
                {props.Groups.map(function (Groups, i) {
                        if(Groups !== null) {
                            if(Groups._id !== null) {
                                return (
                                    <GroupItem Group={Groups} key={Groups._id} handleClick={props.handleClick.bind(null, Groups)} handleDelete={props.onDelete.bind(null, Groups)}/>
                                )
                            }
                        }                    
                })}
                </tbody>
            </table>
        </div>
    )
}
function Group (props) {
    console.log(props); 
    return (
        <div>
            {props.isLoading === true
            ? <h1>Loading</h1>
            : <GroupList
                onDelete={props.onDelete}
                schema={props.schema} 
                Groups={props.Groups}
                handleClick={props.handleClick}/>}
        </div>
    )
};

Group.PropTypes = {
    EventGroups : PropTypes.object.isRequired
}

module.exports = Group;