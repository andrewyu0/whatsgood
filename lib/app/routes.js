var AppController = require('./app.controller.js');

function setupRoutes(app){
	app.get('/', AppController.sendMessage);
	app.get('/index', AppController.index);
}

module.exports = setupRoutes;