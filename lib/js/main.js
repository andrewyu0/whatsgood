var app = angular.module('myApp', []);

// Creates API urls
var generateAPIurl = function(urlParam){
	return "https://www.kimonolabs.com/api/" + urlParam + "?apikey=1YZePuACbhVc04ySCO2m9KvBBQmc6flD&callback=JSON_CALLBACK";
};

// APIs
var mezzAPIurl  = generateAPIurl("21hty48u");
var audioAPIurl = generateAPIurl("8ikxwdlu");

// Controller
app.controller('MainCtrl', function($scope, $http, $location){

		$scope.go = function ( path ) {
		  $location.path( path );
		};

		// MEZZANINE
 		$http.jsonp(mezzAPIurl).success(function(data){
 			$scope.mezzData = data['results']['MezzanineSF'];
 		});

		// AUDIOSF
 		$http.jsonp(audioAPIurl).success(function(data){
 			$scope.audioData = data['results']['AudioSF'];
 			console.log($scope.audioData)
 		})

});

