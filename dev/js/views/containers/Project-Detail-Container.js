import React from 'react';
import State from '../../helpers/state';
import Tile from '../components/EventTile';

export default class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.store = State.getInstance();

        this.state = {
            isLoading: true,
            project: {}
        };

        this._setItems = this._setItems.bind(this);
        this._renderDetailList = this._renderDetailList.bind(this);
    }

    componentWillMount() {
        console.log(this.store);
        this.unsubscribe = this.store.subscribe('data', this._setItems);
    }

    _setItems() {
        console.log('set items project detail');
    }

    componentWillUnmount() {

    }

    componentDidMount() {
        const data = this.store.get('data');

        for(let item of data) {
            if(item.project_id == this.props.params.project_id) {
                this.setState({
                    isLoading: false,
                    project: item
                });
            }
        }
    }

    _renderDetailList() {
        // console.log(this.state.data);
        let details = [];

        this.state.project.data.map((item, i) => {
            details.push(
               <Tile event={item} key={item._id} />
            )
        });

        return details;
    }

    render() {
        return (
            <div className='detail-page'>
            {
                this.state.isLoading == true
                ? <h1> Loading... </h1>
                :
                <div className='ev-tile-row'>
                    {this._renderDetailList()}
                </div>
            }
            </div>
        )
    }

}
