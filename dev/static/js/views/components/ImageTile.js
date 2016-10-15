var React = require('react'),
    PropTypes = React.PropTypes;

function ImageTile (props) {
    return(
         <div className="image-tile">
            <img className="image-tile-content" src={'/images/' + props.image.name}/>
        </div>
    )
};

function ImageRow (props) {
    return(
        <div className="image-tile-row">
            {props.images.map(function(image, i) {
                return (
                   <ImageTile image={image} key={image._id}/>
                )
            })}
        </div>
    )
};

var ImageLibrary = React.createClass({
    render: function() {
        return (
            <div>
                <ImageRow images={this.props.images}/>
            </div>
        )
    }
});

module.exports = ImageLibrary;
