'use strict';

const React = require('react');
let Header = require('./headerComponent.jsx');

class UserSearch extends React.Component {
	constructor() {
		super();
		this.state = {
			varText: 'Type above to change this text.',
			data: [
				{"id": "1", "name": "Jack"},
				{"id": "2", "name": "Jill"},
				{"id": "3", "name": "Ben"},
				{"id": "4", "name": "Susy"},
				{"id": "5", "name": "Mike"},
				{"id": "6", "name": "Jenn"},
				{"id": "7", "name": "Bob"},
				{"id": "8", "name": "Kelly"},
				{"id": "9", "name": "Mark"},
				{"id": "10", "name": "Britney"}
			]
		};
		this.update = this.update.bind(this);
	}

	update(e) {
		this.setState({varText: e.target.value})
	}

	render() {
		let text = this.props.text;
		let rows = this.state.data.map( person => {
			return <PersonRow key={person.id} data={person} />
		})
		return (
			<div>
				<Header title="User Search"/>
				<h1 className="page-title text-center">
					React Sandbox: {this.props.title}
				</h1>
				<div className="content-container">
					<div className="small-12 columns text-center"><h4>{text}</h4></div>
					<div className="row">
						<div className="small-6 centered columns text-center">
							<input type="text" onChange={this.update} />
						</div>
					</div>
					<div className="small-12 columns text-center">
						<h6>{this.state.varText}</h6>
					</div>
					<hr/>
					<div className="small-4 centered columns">
						<table>
							<tbody>{rows}</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
};

const PersonRow = (props) => {
	return (
		<tr>
			<td>{props.data.id}</td>
			<td>{props.data.name}</td>
		</tr>
	)
}

UserSearch.propTypes = {
	text: React.PropTypes.string
}

UserSearch.defaultProps = {
	title: 'User Search',
	text: "Content goes here."
}

module.exports = UserSearch;
