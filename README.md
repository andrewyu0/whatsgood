### Node Boilerplate

1. Create package.json 
	
	```
	{
	    "name"    : "node-boilerplate",
	    "private" : true,
	    "dependencies" : {
	        "express"  : "~4.2.0",
	        "jade"     : "~1.3.0"
	    }
	}
	```
2. npm install 

3. create `app.js`

4. Move functionality into a **lib** directory 

* lib
	* app
		* app.controller.js
		* routes.js

5. Move routes from `app.js` to `routes.js`

```
// app.controller.js
// This file contains function that interacts with user request

module.exports = {
	sendMessage : function(req, res){
		res.send('first message')
	}
}

// routes.js

var AppController = require('./app.controller.js');

function setupRoutes(app){
	app.get('/', AppController.sendMessage);
}

module.exports = setupRoutes;

// app.js
// Set up routes in app.js
var setupAppRoutes = require('./lib/app/routes');
setupAppRoutes(app);

```

Should behave the same when `node app.js` is started. Should see "first message" on the screen

6. Views
	1. Tell app where to look for our view files 
	2. Tell app the views are in jade

```
// Tell app where to look for views, tell it we're using Jade
var path = require('path');
app.set('views', path.join(__dirname, 'lib', 'views'));
app.set('view engine', 'jade');
```

	3. Create `lib/views/layout.jade`
	4. Create an index view `lib/views/index.jade`

7. controller/route/view set up for index

```
// in app.controller add index controller action
index : function(req, res){
	res.render('index', {title: 'Index Page for Boilerplate'})
}

// in routes add the route
app.get('/index', AppController.index);

```
