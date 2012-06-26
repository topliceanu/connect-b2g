connect-b2g
===========


Abstract
--------

Connect middleware that delivers an application manifest compatible with Mozilla's Open Web Apps initiative

Installation
------------

	npm install connect-b2g

More
----

Open Web Apps are web apps that are installable on Mozilla's Boot 2 Gecko Operating System.

Any website can be installed as an app on B2G but it needs to provide a manifest file. 

This is a text file containing a json document. It can have any name but must have the extension `.webapp`. 

It will be requested from the webroot by the client device, much like a favicon.

	Example: http://domain.com/manifest.webapp


This simple connect middleware delivers the mainfest from a given file path.

To find out more about creating Boot to Gecko Apps go to the [Mozilla Developer Network](https://developer.mozilla.org/en/Apps)

This middleware does not enforce the manifest schema or format. Read about these [here](https://developer.mozilla.org/en/Apps/Manifest).

Usage
-----

Much like any other connect middleware

	var connect = require('connect');
	var b2g = require('connect-b2g');

	var app = connect()
		.use( b2g( 'path/to/manifest.webapp' ) )
		.listen(3000);


Running tests
-------------

To run tests you need to install [mocha](http://visionmedia.github.com/mocha/) and [request](https://github.com/mikeal/request).

	sudo npm install -g mocha
	npm install request

	mocha 


Roadmap
-------

This project is intended as a utility middleware for B2G app developers.

As such, whenever new features are added to the specs, they will be implemented here.

Feel free to send me feedback and to contribute to this project.


Licence
-------

[WTFPL](http://sam.zoy.org/wtfpl/)


