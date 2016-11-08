import React from 'react';
import State from '../../helpers/state';

export default class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.store = State.getInstance();

    }

    render() {
        return (
            <div> Test! </div>
        )
    }
}
