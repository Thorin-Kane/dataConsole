import React from 'react';
import State from '../../helpers/state';

//in real world I need to take url params and query for data from db
export default class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.store = State.getInstance();

        this.state = {
            data: {}
        };
    }

    componentWillMount() {
        // console.log(this.store);
        this.unsubscribe = this.store.subscribe('active_project', this._setItems);
    }

    _setItems() {
        //on change set new state
    }

    componentWillUnmount() {

    }

    componentDidMount() {
        const data = this.store.get('data');

        for(var item of data) {
            if(item.project_id == this.props.params.project_id) {
                 this.setState({
                    data: item
                });
            }
        }
    }

    render() {
        return (
            <div>Project Detail!</div>
        )
    }

}
