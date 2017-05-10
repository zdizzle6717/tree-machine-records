'use strict';

import React from 'react';
import {Link} from 'react-router-dom';
import {CSSTransitionGroup as Animation} from 'react-transition-group';
import SideBar from '../pieces/SideBar';

export default class Archive extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            archive: []
        }
    }

    componentDidMount() {
        document.title = "Tree Machine Records | Archive";
    }

    render() {
        return (
			<div className="content-wrapper">
				<div className="row">
					<div className="small-12 medium-8 large-9 columns">
						<h1>Archive</h1>
		                <h2>Under Construction</h2>
		            </div>
					<SideBar/>
				</div>
			</div>
        );
    }
}
