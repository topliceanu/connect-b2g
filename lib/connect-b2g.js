var fs = require('fs');
var path = require('path');

var manifest;

module.exports = function b2g (filePath, options) {
	filePath = filePath || path.join( __dirname, 'public/manifest.webapp' );
	options = options || {};
	options.maxAge = options.maxAge || 30 * 24 * 60 * 60 * 1000; // cache for 30 days

	return function b2g (req, res, next) {
		if (req.url === '/manifest.webapp') {
			if (manifest && manifest.headers && manifest.body) {
				res.writeHead(200, manifest.headers);
				res.end(manifest.body);
			}
			else {
				fs.readFile(filePath, function (err, buffer) {
					if (err) return next(err);		
					manifest = { // this is defined as a global
						headers: {
							'Content-Type': 'application/x-web-app-manifest+json',
							'Content-Length': buffer.length,
							'Cache-Control': 'public, max-age=' + (options.maxAge / 1000)
						},
						body: buffer
					};
					res.writeHead(200, manifest.headers);
					res.end(manifest.body);
				});
			}
		}
		else {
			return next();
		}
	};
};
