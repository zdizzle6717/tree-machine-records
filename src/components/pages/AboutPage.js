'use strict';

import React from 'react';
import {Link} from 'react-router';
import Animation from 'react-addons-css-transition-group';
import SideBar from '../pieces/SideBar';

export default class ArchivePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            archive: []
        }
    }

    componentDidMount() {
        document.title = "Tree Machine Records | About/Contact";
    }
	
    render() {
        return (
			<div className="content-wrapper">
				<div className="row">
					<div className="small-12 medium-8 large-9 columns">
						<h1>About</h1>
		                <p>
		                    The future is guided only by the past, and the present is decided only by our choices here and now.
		                    As technology advances, so much continues to change culturally and in many of the same ways across the globe.
		                    Tree Machine records is our way of giving you a portal to peer into the past, and listen to the sounds that shape our future.
		                    Artists have connected with us and vice versa from various parts of the diverse, aural landscapes of the world
		                    that bring us together at the deepest level.  It's our honor to create records of these mucisians' will to find meaning,
		                    in the beauty of life, throughout any given time.
		                </p>
		                <h4><a href="mailto: treemachinerecords@gmail.com">TreeMachineRecords (at) gmail.com</a></h4>
		            </div>
					<SideBar/>
				</div>
			</div>
        );
    }
}
