import React from 'react';
import State from '../../helpers/state';
import data from '../../data/events.json';

import Projects from '../components/Projects';

export default class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.store = State.getInstance();

        this.state = {
            data: [],
            isLoading: true
        }

        this._setItems = this._setItems.bind(this);
        this._handleClick = this._handleClick.bind(this);
    }

    componentWillMount() {
        this.store.set('data', data);
        console.log(this.store);
        this.unsubscribe = this.store.subscribe('data', this._setItems);

    }

    _setItems() {
        // console.log(this.store);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    componentDidMount() {
        this.setState({
            isLoading: false,
            data: this.store.get('data')
        });
    }

    _handleClick(project) {
        this.store.set('active_project', project);
        // console.log(project);
    }

    render() {
        return (
            <div>
                {this.state.isLoading == true
                ? <h1> Loading...</h1>
                :
                <Projects projects={this.state.data} handleClick={this._handleClick}/>}
            </div>
        )
    }
}
