var app = angular.module('myApp', []);

// Creates API urls
var generateAPIurl = function(urlParam){
	return "https://www.kimonolabs.com/api/" + urlParam + "?apikey=1YZePuACbhVc04ySCO2m9KvBBQmc6flD&callback=JSON_CALLBACK";
};

// APIs
var mezzAPIurl  = generateAPIurl("21hty48u");
var audioAPIurl = generateAPIurl("8ikxwdlu");
var pwAPIurl    = generateAPIurl("brhu9xsa");
var fillmoreAPIurl = generateAPIurl("7u19yn74");
var indyAPIurl = generateAPIurl("a6l6i2pc");

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
 		});

 		// PUBLICWORKS
 		$http.jsonp(pwAPIurl).success(function(data){
 			console.log(JSON.stringify(data['results']['PublicWorksEvent'][0], null, 2))

 		});

 		// FILLMORE
 		$http.jsonp(fillmoreAPIurl).success(function(data){
 			console.log(JSON.stringify(data['results']['Fillmore'][0], null, 2))

			console.log(data['results']['Fillmore'][0]['informationAll'].split("\n"))

 		});


});

/*

* @ay 9/3/15
* Standardize these schemas somehow
* Create functions that standardize these schemas? Separate out in different files?
* Put it up, make it live before I do any back end changes 


// PUBLICWORKS

{
  "date": {
    "href": "http://publicsf.com/events/that-big-80s-party-2-13165",
    "text": "04 sep"
  },
  "artist": {
    "href": "http://publicsf.com/events/that-big-80s-party-2-13165",
    "text": "04 sep\nThat BIG 80s Party"
  },
  "image": {
    "href": "http://publicsf.com/events/that-big-80s-party-2-13165",
    "src": "http://publicsf.com/wp/wp-content/uploads/2015/08/11050305_393096284221356_5953334859765055957_n-80x80.jpg",
    "text": ""
  }, 
  "time": {
    "href": "http://bit.ly/80s090415",
    "text": "9:00pm – 2:00am   Presales $8, door $10"
  },
  "index": 1,
  "url": "http://publicsf.com/listing"
}


// FILLMORE
// need to parse "information all" 

{
  "artist": {
    "href": "http://thefillmore.com/event/blackalicious/",
    "text": "Blackalicious with Lifesavas, Raw G, Rev. Shines, Davey D"
  },
  "informationAll": "Thursday, September 10, 2015\nDoors 7:00 p.m. // Show 8:00 p.m.\nTickets are $25.00 plus applicable charges.",
  "image": {
    "href": "http://thefillmore.com/event/blackalicious/",
    "src": "http://2aze3x1513e223idii1lnf45.wpengine.netdna-cdn.com/wp-content/uploads/2015/07/Blackalicious-460x305.jpg",
    "text": ""
  },
  "index": 1,
  "url": "http://thefillmore.com/calendar/"
}

*/