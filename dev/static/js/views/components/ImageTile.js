var React = require('react'),
    PropTypes = React.PropTypes;

function ImageTile (props) {
    var bgImage = {
        backgroundImage: 'url(' + props.image.url + ')'
    }

    return(
        <div className="image-tile">
            <img className="image-tile-content" src={props.image.url}/>
            <div className="remove-container">
                <span id = "remove-icon" className="remove image-tile-remove" onClick={props.handleRemove}> </span>
            </div>
        </div>
    )
};

function ImageRow (props) {
    return(
        <div className="image-tile-row">
            {props.images.map(function(image, i) {
                return (
                   <ImageTile image={image} key={image._id} handleRemove={props.handleRemove.bind(null, image)}/>
                )
            })}
        </div>
    )
};

var ImageLibrary = React.createClass({
    render: function() {
        return (
            <div>
                <ImageRow images={this.props.images} handleRemove={this.props.handleRemove}/>
            </div>
        )
    }
});

module.exports = ImageLibrary;
