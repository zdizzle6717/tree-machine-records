switch (process.env.NODE_ENV) {
	case 'client':
	module.exports = require('./webpack.client')({env: 'production'});
		break;
	case 'development':
	module.exports = require('./webpack.dev')({env: 'development'});
		break;
  case 'production':
    module.exports = require('./webpack.prod')({env: 'production'});
    break;
	case 'server':
	module.exports = require('./webpack.server')({env: 'production'});
		break;
  default:
    module.exports = require('./webpack.dev')({env: 'development'});
}
