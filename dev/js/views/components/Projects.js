import React from 'react';
import { Link } from 'react-router';
//this will be our home page dropdown to select project
//selecting will move to data page

export default class Project extends React.Component{
    constructor(props) {
        super(props);
        this.state={};

        this._renderDropdown = this._renderDropdown.bind(this)
    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    _renderDropdown() {
        let projects = [];

        this.props.projects.map((item, i) => {
            projects.push(
                <Link to={'/project/' + item.project_id} key={item.project_id} onClick={this.props.handleClick.bind(null, item)}> {item.project_name} </Link>
            )
        });

        return projects;
    }

    render() {
        return (
            <div className='project-region'>
                <div className='select-project'>
                    {this._renderDropdown()}
                </div>
            </div>
        )
    }
}
