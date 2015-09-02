### Whatsgood 

Steps 1 - 7 are same as node-boilerplate. 

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

8. Angularized the app 
	1. Add script, include
	2. Create `main.js`

9. Make kimono talk with angular
	1. See the tutorial link. Walk through the steps here, write them down like a PRD

```
app.controller('MainCtrl', function($scope, $http){
		$scope.myMessage = "Hey what's good SF";

		url = "https://www.kimonolabs.com/api/21hty48u?apikey=1YZePuACbhVc04ySCO2m9KvBBQmc6flD&callback=JSON_CALLBACK";
 		$http.jsonp(url).

 		success(function(data){
 			$scope.mezzData = data['results']['MezzanineSF'];
 		})
});
```

@TODO Look into whats going on it json.p
* check out this post http://stackoverflow.com/questions/12066002/parsing-jsonp-http-jsonp-response-in-angular-js

10. added bootstrap 

11. added function to generate API url key
```
// Creates API urls
var generateAPIurl = function(urlParam){
	return "https://www.kimonolabs.com/api/" + urlParam + "?apikey=1YZePuACbhVc04ySCO2m9KvBBQmc6flD&callback=JSON_CALLBACK";
};
```

12. Date filter
	* As a user, I want to see today's date, and the events that match today's date
	* As a user, if a venue does not have any events today, I want to see the next one coming up (?)
		* Maybe have it show the one from before? At least something that says "NO EVENT TODAY - next event is: "


@issue - every site is different. Format them all in some way? Would hate to do it all in the angular controller.


13. Add styling 
`lib/styles/main.css`

14. Added spinkit 

15. Next 3 functionality 

```
// in routes
	app.get('/mezz3', AppController.mezz3);

// in controller
	mezz3 : function(req, res){
		res.render('mezz3');
	}
	
```
____________


@TODO Features

* Map/List view toggle
* 