    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    var api_version = 0.01 ;
    // configuration =================

    mongoose.connect('mongodb://localhost/cleanBlog');     

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());


    // Model

    var post = require('./model/post');


    app.get('/api/version', function(req, res) {
    	res.json(api_version);
    });

    app.get('/api/posts', function(req,res){
    	post.listAllByUpdated(function(error, posts){
    		if(error){
    			console.log("error: " + error);
    			res.send(error);
    		}else{
    			res.json(posts);
    		}
    	});
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    // listen (start app with node server.js) ======================================
    app.listen(4000);
    console.log("App listening on port 4000");