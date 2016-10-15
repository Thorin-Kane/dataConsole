var React = require('react'),
    Panel = require('react-bootstrap').Panel,
    PropTypes = React.PropTypes,
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    CollapsiblePanel = require('../components/CollapsiblePanel');


function FormItems (props) {
    return (
        <div>
            <div>
                {props.schema.map(function (property, i) {
                    return (
                        <div className="col-sm-4 col-lg-4" key={property._id} >
                             <div className="form-group form-input">
                                <label>{property.label}</label>
                                <input
                                    type="text"
                                    placeholder={property.defaultValue}
                                    className="form-control"
                                    name={property.field}
                                    onChange={props.handleChange}>
                                </input>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="col-sm-4 col-lg-4">
                <div className="form-group form-input">
                    <label>Upload Background Image</label>
                    <input
                        type="file"
                        name="backgroundImage"
                        className="form-control"
                        placeholder="URL"
                        onChange={props.handleUpload}/>
                </div>
            </div>
        </div>
    )
};

var NewItem = React.createClass({
    mixins: [LinkedStateMixin],
    PropTypes: {
        schema:React.PropTypes.object.isRequired,
        isLoading: React.PropTypes.bool.isRequired,
        group: React.PropTypes.object.isRequired,
        onFormSubmit: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {

        }
    },
    handleChange: function(e) {
        var nextState= {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    },
    handleSubmit: function(e) {
        e.preventDefault();

        //here is the problem
        var NewEvent = this.state;
        this.props.onFormSubmit(NewEvent);
    },
    handleUpload: function (e) {
        if(confirm("Upload this Image?")){
            var files =Array.prototype.slice.call(e.target.files);
            var URL = files[0].name;

            var nextState={};
            nextState[e.target.name] = URL.toString();
            this.setState(nextState);

            var formData = new FormData(),
                xhr = new XMLHttpRequest();

            formData.append('file', files[0]);

            xhr.open('POST', '/upload');
            xhr.send(formData);
        } else {
            //do nothing
        }
    },
    render: function() {
        return(
            // <div>
            // {this.props.isLoading == true
            // ? <h1> Loading </h1>
            // :
            <CollapsiblePanel handleSubmit={this.handleSubmit}>
               <FormItems
                   schema={this.props.schema}
                   handleChange={this.handleChange}
                   handleUpload={this.handleUpload}/>
            </CollapsiblePanel>
            // }
            // </div>
        )
    }
})

module.exports = NewItem;
