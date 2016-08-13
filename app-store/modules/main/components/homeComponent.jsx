'use strict';

const React = require('react');
let Header = require('./headerComponent.jsx');

class Home extends React.Component {
	render() {
		return (
			<div>
				<Header title="User Search"/>
				<h1 className="page-title text-center">
					React Sandbox: {this.props.title}
				</h1>
				<div className="row">
					<div className="small-12 columns text-center"><p>This is the sandbox home page. Use the links above to navigate.</p></div>
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

Home.propTypes = {
	text: React.PropTypes.string
}

Home.defaultProps = {
	title: "Home"
}

module.exports = Home;
