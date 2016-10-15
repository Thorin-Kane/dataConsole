var React = require('react'),
    Panel = require('react-bootstrap').Panel,
    PropTypes = React.PropTypes;

CollapsiblePanel = React.createClass({
    PropTypes: {
        handleSubmit: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {
            open: false,
        }
    },
    toggleContent: function() {
        this.setState({
            open: !(this.state.open)
        })
    },
    render: function () {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title" onClick={this.toggleContent}>
                                <span className="glyphicon glyphicon-plus"></span> ADD NEW
                            </h3>
                        </div>
                    </div>
                    <Panel collapsible expanded={this.state.open}>
                        <form className="form-horizontal" role="form">
                            <div className="row">
                                {this.props.children}
                            </div>
                            <div>
                                <button 
                                    type="submit" 
                                    className="btn btn-default btn-lg pull-right"
                                    onClick={this.props.handleSubmit}>
                                    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>Add
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-default btn-lg pull-right"
                                    onClick={this.toggleContent}>
                                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Cancel
                                </button>
                            </div>
                        </form>
                    </Panel>
                </div>
            </div>
        )
    }   
});

module.exports = CollapsiblePanel;
