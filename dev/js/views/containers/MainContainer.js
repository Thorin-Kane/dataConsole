import React from 'react';
import State from '../../helpers/state';
// import data from '../../data/events.json';

import Projects from '../components/Projects';
import UploaderContainer from './UploaderContainer';

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
            // data: this.store.get('data')
        });
    }

    _handleClick(project) {

    }

    render() {
        return (
            <div className='main-page'>
            {
                this.state.isLoading == true
                ? <h1> Loading...</h1>
                :
                <div className='main-page-container'>
                    <div className='project-region'>
                        <Projects projects={this.state.data} handleClick={this._handleClick}/>
                        <UploaderContainer />
                    </div>
                </div>

            }
            </div>
        )
    }
}
