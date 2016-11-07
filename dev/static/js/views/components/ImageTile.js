import React from  'react';

class ImageLibrary extends React.Component {
    constructor(props) {
        super(props);
        this.state={};

        this._renderImageTile = this._renderImageTile.bind(this);
    }

    _handleRemove() {
        //redux will handle this state
    }

    _renderImageTile(image, i) {
       return (
            <div className="image-tile" key={i}>
                <img className="image-tile-content" src={image.url}/>
                <div className="remove-container">
                    <span id = "remove-icon" className="remove image-tile-remove"> </span>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className='test-library'>
                
            </div>
        )
    }
};

export default ImageLibrary;
