import React from 'react';

export default class ImageTile extends React.Component {
    constructor(props) {
        super(props);
        this.state={};
    }

    render() {
        return (
            <div className="image-tile">
                <img className="image-tile-content" src={this.props.image}/>
                <div className="remove-container">
                    <span id = "remove-icon" className="remove image-tile-remove" onClick={this.props.handleRemove}> </span>
                </div>
            </div>
        );
   }
}
