var app = angular.module('myApp', []);


// Creates API urls
var generateAPIurl = function(urlParam){
	return "https://www.kimonolabs.com/api/" + urlParam + "?apikey=1YZePuACbhVc04ySCO2m9KvBBQmc6flD&callback=JSON_CALLBACK";
};


// APIs
var mezzAPIurl     = generateAPIurl("21hty48u");
var audioAPIurl    = generateAPIurl("8ikxwdlu");
var pwAPIurl       = generateAPIurl("brhu9xsa");
var fillmoreAPIurl = generateAPIurl("7u19yn74");
var indyAPIurl     = generateAPIurl("a6l6i2pc");
var a1015APIurl     = generateAPIurl("1z7ftzks");
var warfieldAPIurl = generateAPIurl("8o7o1ans");

// Controller
app.controller('MainCtrl', function($scope, $http){


    // Prints pretty JSON of 0 index. Will be used to compare schemas
    var printPretty = function(APIurl, collectionName){
      $http.jsonp(APIurl).success(function(data){
        console.log(JSON.stringify(data['results'][collectionName][0], null, 2))
        });
    }


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
        
      var pwData          = data['results']['PublicWorksEvent'];
      var formattedPwData = [];

      for(var i = 0; i < pwData.length; i++){
        var formattedEventObj = formatEventObj(
          // date
          pwData[i]['date']['text'],
          // artist
          pwData[i]['artist']['text'],
          // image
          pwData[i]['image']['src'],
          // priceTime
          pwData[i]['time']['text'],             
          // url
          pwData[i]['artist']['href']
        );
        formattedPwData.push(formattedEventObj);
      }

      //$scope.pwData = formattedPwData;
 		});


 		// FILLMORE
 		$http.jsonp(fillmoreAPIurl).success(function(data){

      var fillmoreData          = data['results']['Fillmore'];
      var formattedFillmoreData = [];

      for(var i = 0; i < fillmoreData.length; i++){
        // this step is unique to Fillmore, bc they lump all their info in one field
        var informationAllSplit = fillmoreData[i]['informationAll'].split("\n");

        var formattedEventObj = formatEventObj(
          // date
          informationAllSplit[0],
          // artist
          fillmoreData[i]['artist']['text'],
          // image
          fillmoreData[i]['image']['src'],
          // priceTime
          informationAllSplit[1]+" "+informationAllSplit[2],
          // url
          fillmoreData[i]['artist']['href']
        );
        formattedFillmoreData.push(formattedEventObj);
      }

      console.log(formattedFillmoreData)

 		});


 		// INDEPENDENT
 		$http.jsonp(indyAPIurl).success(function(data){
 			// printPretty(indyAPIurl, 'Independent')
 			$scope.indyData = data['results']['Independent'];
 		});


    // 1015FOLSOM
    $http.jsonp(a1015APIurl).success(function(data){
      // printPretty(a1015APIurl, '1015Folsom');
    });


    // WARFIELD
    $http.jsonp(warfieldAPIurl).success(function(data){
      // printPretty(warfieldAPIurl, 'Warfield');
    });


});

// ADDITIONAL FUNCTIONS
var formatEventObj = function(date, artist, image, priceTime, url){
  var formattedEventObj = {};
  formattedEventObj.date      = date;
  formattedEventObj.artist    = artist;
  formattedEventObj.priceTime = priceTime;
  formattedEventObj.url       = url;
  return formattedEventObj
}


/*

* @ay 9/3/15
* Standardize these schemas somehow
* Create functions that standardize these schemas? Separate out in different files?
* Put it up, make it live before I do any back end changes 


// ############################## PUBLICWORKS

date : ['date']['text']
artist : ['artist']['text'] 
image : ['image']['src']
price/time : ['time']['text']
link: ['artist']['href']

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



// ############################## FILLMORE
// need to parse "information all" 

date
artist : ['artist']['text']
image : ['image']['src']
price/time : ['informationAll'].replace(/n)

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

// ############################## INDEPENDENT 

date
artist
image
price/time

{
  "date": "Thursday 03 September 2015",
  "artist": {
    "href": "http://www.songkick.com/concerts/24376109-lee-scratch-perry-at-independent",
    "text": "Lee \"Scratch\" Perry"
  },
  "image": {
    "alt": "Lee \"Scratch\" Perry live",
    "href": "http://www.songkick.com/concerts/24376109-lee-scratch-perry-at-independent",
    "src": "http://images.sk-static.com/images/media/profile_images/artists/317223/large_avatar",
    "text": ""
  },
  "buyTickets": {
    "href": "http://www.songkick.com/concerts/24376109-lee-scratch-perry-at-independent",
    "text": "Buy tickets"
  },
  "index": 1,
  "url": "http://www.songkick.com/venues/324-independent"



  // ###################### 1015 Folsom
  
  date
  artist
  image
  price/time

  {
    "month": "Sep",
    "day": "11th",
    "artist": {
      "href": "http://1015.com/events/09-11-2015/mad-decent/",
      "text": "MAD DECENT BLOCK PARTY AFTERPARTY\nft MAD DECENT ALL STARS"
    },
    "image": {
      "href": "http://1015.com/events/09-11-2015/mad-decent/",
      "src": "http://1015.com/wp-content/uploads/2015/08/8943893_orig_345x150_acf_cropped.jpg",
      "text": ""
    },
    "info": {
      "href": "http://1015.com/events/09-11-2015/mad-decent/",
      "text": "INFO"
    },
    "index": 1,
    "url": "http://1015.com/calendar/"
  }


  // #################### WARFIELD

  date
  artist
  image
  price/time

  {
    "artist": {
      "href": "http://www.thewarfieldtheatre.com/events/detail/277964",
      "text": "The Australian Pink Floyd Show"
    },
    "image": {
      "alt": "",
      "href": "http://www.thewarfieldtheatre.com/events/detail/277964",
      "src": "http://d1ya1fm0bicxg1.cloudfront.net/2015/04/the-australian-pink-floyd-show-tickets_09-12-15_23_553e73e015a1c.jpg",
      "text": ""
    },
    "date": "Fri, Sep 11, 2015",
    "time": "Show\n8:00 PM",
    "index": 1,
    "url": "http://www.thewarfieldtheatre.com/events"
  }

*/