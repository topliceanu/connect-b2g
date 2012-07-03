var fs = require('fs');
var path = require('path');
var connect = require('connect');
var request = require('supertest');

var b2g = require('../');

var manifestPath = 'test/fixtures/manifest.webapp';
var app = connect();
app.use( b2g(manifestPath) )

describe( 'connect-b2g()', function () {
	it('should server the correct manifest file with correct Content-Type header', function (done) {
		fs.readFile( manifestPath, 'UTF-8', function (err, fileContents) {
			if (err) return done(err);
			request(app)
				.get('/manifest.webapp')
				.set('Accept', 'application/x-web-app-manifest+json')
				.expect('Content-Type', 'application/x-web-app-manifest+json')
				.expect(200)
				.expect(fileContents)
				.end(done);
		});
	});
});
