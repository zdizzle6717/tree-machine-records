'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware();
import envVariables from '../envVariables';
import routeConfig from './routeConfig';
import rootReducer from '../src/reducers';
import rootSaga from '../src/sagas';
import Layout from '../src/components/Layout';
import routes from '../src/routes';

// Initialize the server and configure support for handlebars templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname + '/../dist/')));

// Universal routing and rendering for SEO
for (let i in routeConfig) {
    let routePath = routeConfig[i].route;
    let routeView = routeConfig[i].view;

    app.get(routePath, (req, res) => {
		let promises = [];
		const context = {};
		const initialState = {};
		const store = createStore(
			rootReducer,
			initialState,
			applyMiddleware(
				thunkMiddleware,
				sagaMiddleware
			)
		);

		sagaMiddleware.run(rootSaga),

		routes.some(route => {
			const match = matchPath(req.url, route);
			if (match && route.fetchData) {
				const Comp = route.component.WrappedComponent
    			const initData = (Comp && route.fetchData) || (() => Promise.resolve());
				// fetchData calls a dispatch on the store updating the current state before render
				promises.push(initData(store));
			}
			return match;
		});

		Promise.all(promises).then(() => {
			const markup = ReactDOMServer.renderToString(
				<Provider store={store}>
					<StaticRouter location={req.url} context={context}>
				      <Layout/>
				    </StaticRouter>
				</Provider>
			)

			// This gets the initial state created after all dispatches are called in fetchData
			Object.assign(initialState, store.getState());

			const state = JSON.stringify(initialState);

			if (context.url) {
				console.log('Somewhere a <Redirect> was rendered');
				res.writeHead(context.status, {
					'Location': context.url
				});
				res.end();
			} else {
				return res.render(routeView, {markup, state});
			}
		});

	});
}

// Start the server
const port = envVariables.clientPort;
server.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running at: ${envVariables.baseUrl}:${port}, with process id ${process.pid}`);
});
