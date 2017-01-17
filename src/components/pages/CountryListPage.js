'use strict';

import React from 'react';
import {Link} from 'react-router';
import Animation from 'react-addons-css-transition-group';
import CountryTile from '../pieces/CountryTile';
// import CountryActions from '../../actions/CountryActions';
// import CountryStore from '../../stores/CountryStore';

export default class CountryListPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            'countries': [
				{
					'countryCode': 'US',
					'Files': [{'name': 'united-states-of-america.png'}, {'name': 'united-states-of-america-fill.png'}]
				},
				{
					'countryCode': 'CA',
					'Files': [{'name': 'canada.png'}, {'name': 'canada-fill.png'}]
				},
				{
					'countryCode': 'FR',
					'Files': [{'name': 'france.png'}, {'name': 'france-fill.png'}]
				},
				{
					'countryCode': 'SA',
					'Files': [{'name': 'south-africa.png'}, {'name': 'south-africa-fill.png'}]
				},
				{
					'countryCode': 'KR',
					'Files': [{'name': 'south-korea.png'}, {'name': 'south-korea-fill.png'}]
				},
				{
					'countryCode': 'UK',
					'Files': [{'name': 'united-kingdom.png'}, {'name': 'united-kingdom-fill.png'}]
				}
			]
        }
    }

    componentDidMount() {
        document.title = "Tree Machine Records | Origins";
    }

    render() {
        return (
			<div className="content-wrapper">
				<div className="row">
					<div className="maps">
						<Animation transitionName="fade" className="animation-wrapper" transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
							{
								this.state.countries.map((country, i) =>
									<CountryTile key={i} countryCode={country.countryCode} imageFront={country.Files[0].name} imageBack={country.Files[1].name}/>
								)
							}
						</Animation>
					</div>
		        </div>
			</div>

        );
    }
}
