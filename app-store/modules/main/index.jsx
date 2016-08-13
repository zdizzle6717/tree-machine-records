'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const RR = require('react-router');

let Home = require('./components/homeComponent.jsx');
let UserSearch = require('./components/userSearchComponent.jsx');

class App extends React.Component {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
};

// ReactDOM.render(
// 	<App />,
// 	document.getElementById('app')
// );

ReactDOM.render((
   <RR.Router history = {RR.browserHistory}>
      <RR.Route path="/store/" component={App}>
         <RR.IndexRoute component={Home} />
         <RR.Route path="/store/home" component={Home} />
		 <RR.Route path="/store/users" component={UserSearch} />
      </RR.Route>
  </RR.Router>

), document.getElementById('app'));
