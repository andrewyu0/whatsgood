// This file contains function that interacts with user request
var request = require("request");

module.exports = {
	sendMessage : function(req, res){
		res.send('first message')
	},

	index : function(req, res){
		res.render('index', {
			title: 'Whats good SF'
		});		
	},

	mezz3 : function(req, res){
		res.render('mezz3');
	}
}
