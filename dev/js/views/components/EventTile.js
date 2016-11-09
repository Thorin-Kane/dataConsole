import React from 'react';

export default class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="ev-main-tile" style={{backgroundImage: 'url(/images/' + this.props.event.backgroundImage + ')' }}>
                <div className='ev-main-tile-scrim'></div>
               <section className=" ev-main-content" >
                    <div className="ev-region-title">
                        <h3 className="ev-date"> {this.props.event.dateStart} </h3>
                        <h3 className="ev-title"> {this.props.event.title} </h3>
                    </div>
                    <div className="ev-region-location">
                        <h3 className="ev ev-building"> {this.props.event.building} </h3>
                        <h3 className="ev ev-room"> {this.props.event.room} </h3>
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
}

