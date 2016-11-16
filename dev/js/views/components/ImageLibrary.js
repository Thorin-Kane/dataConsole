import React from 'react';
import ImageTile from './ImageTile';

export default class ImageLibrary extends React.Component {
    constructor(props) {
        super(props);
        this.state={};

        this._renderImageRow = this._renderImageRow.bind(this);
    }

    _renderImageRow() {
        let images = [];

        this.props.images.map((item, i) => {
            images.push(
                <ImageTile key={i} image={item.url} handleRemove={this.props.handleRemove.bind(null, item)}/>
            )
        });

        return images;
    }

    render() {
        return (
            <div className="image-tile-row">
                {this._renderImageRow()}
            </div>
        );
    }
}
