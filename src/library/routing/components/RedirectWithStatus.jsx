'use strict';

import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const RedirectWithStatus = ({ from, to, status, location }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
		staticContext.status = status;
	}
    return (
		<Redirect location={location} from={from} to={to}/>
	)
  }}/>
)

export default RedirectWithStatus;
