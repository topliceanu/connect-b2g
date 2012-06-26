var fs = require('fs');
var path = require('path');
var connect = require('connect');
var request = require('request');

var b2g = require('../');

var manifestPath = 'test/fixtures/manifest.webapp';
debugger;
var app


describe( 'connect-b2g()', function () {

	before( function (done) {
		app = connect().use(b2g(manifestPath)).listen(3000);
		done();
	});

	it('should server the correct manifest file', function (done) {
		fs.readFile( manifestPath, 'UTF-8', function (err, fileContents) {
			if (err) return done(err);
			request.get('http://localhost:3000/manifest.webapp', function (err, response) {
				if (err) return done(err);
				if (fileContents !== response.body) return done(Error('not the same content'));
				return done();
			});
		});
	});

	it('should serve the manifest using the correct Content-Type header', function (done) {
		request.get('http://localhost:3000/manifest.webapp', function (err, response) {
			if (err) return done(err);
			if (response.headers['content-type'] !== 'application/x-web-app-manifest+json') 
				return done(Error('unexpected header'));
			return done();
		});
	});

	after( function (done) {
		app.close();
		done();
	});

});
