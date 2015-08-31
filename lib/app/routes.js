var AppController = require('./app.controller.js');

function setupRoutes(app){
	app.get('/', AppController.index);
}

module.exports = setupRoutes;