// This file contains function that interacts with user request

module.exports = {
	sendMessage : function(req, res){
		res.send('first message')
	},

	index : function(req, res){
		res.render('index', {title: 'Index Page for Boilerplate'})
	}
}
