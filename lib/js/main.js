var app = angular.module('myApp', []);

app.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});


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
var a1015APIurl    = generateAPIurl("1z7ftzks");
var warfieldAPIurl = generateAPIurl("8o7o1ans");


app.controller('MainCtrl', function($scope, $http){

    // Prints pretty JSON of 0 index. Will be used to compare schemas
    var printPretty = function(APIurl, collectionName){
      $http.jsonp(APIurl).success(function(data){
        console.log(JSON.stringify(data['results'][collectionName][0], null, 2))
        });
    };

    var addCollectionName = function(collectionName, collectionData){
      return {
        collectionName : collectionName,
        data : collectionData
      }
    }

    // Instantiate allVenues array, will be looped over on view
    $scope.allVenues = [];

		// MEZZANINE
 		$http.jsonp(mezzAPIurl).success(function(data){
      
      var mezzData = data['results']['MezzanineSF'];
      var formattedMezzData = [];

      for(var i = 0; i < mezzData.length; i++){
        var formattedEventObj = formatEventObj(
          // date
          mezzData[i]['date'],
          // artist
          mezzData[i]['artist']['text'],
          // image
          mezzData[i]['image']['src'],
          // priceTime
          mezzData[i]['price'],
          // url
          mezzData[i]['artist']['href']
        );
        formattedMezzData.push(formattedEventObj);
      }

      $scope.mezzData = addCollectionName('MEZZANINE', formattedMezzData)
      $scope.allVenues.push($scope.mezzData)
 		});


    // INDEPENDENT
    $http.jsonp(indyAPIurl).success(function(data){

      var indyData = data['results']['Independent'];
      var formattedIndyData = [];

      for(var i = 0; i < indyData.length; i++){
        var formattedEventObj = formatEventObj(
          // date
          indyData[i]['date'],
          // artist
          indyData[i]['artist']['text'].replace('/',''),
          // image
          indyData[i]['image']['src'],
          // priceTime
          null,
          // url
          indyData[i]['artist']['href']
        );
        formattedIndyData.push(formattedEventObj)
      }
      $scope.indyData = addCollectionName('THE INDEPENDENT', formattedIndyData);
      $scope.allVenues.push($scope.indyData);
    });


		// AUDIOSF
 		$http.jsonp(audioAPIurl).success(function(data){
 			$scope.audioData = data['results']['AudioSF'];

      // date ['date']['text']
      // artist ['artist']['text']
      // image ['image']['src']
      // priceTime ""
      // url ['artist']['href']

      var audioData = data['results']['AudioSF'];
      var formattedAudioData = [];
      for(var i = 0; i < audioData.length; i++){
        var formattedEventObj = formatEventObj(
          // date
          audioData[i]['date']['text'],
          // artist
          audioData[i]['artist']['text'],
          // image
          audioData[i]['image']['src'],
          // priceTime
          null,
          // url
          audioData[i]['artist']['href']
        );
        formattedAudioData.push(formattedEventObj);
      }
      $scope.audioData = addCollectionName('AUDIO SF', formattedAudioData);
      $scope.allVenues.push($scope.audioData);
    
    // console.log($scope.allVenues)

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
      $scope.pwData = addCollectionName('PUBLIC WORKS', formattedPwData);
      $scope.allVenues.push($scope.pwData);
 		});


    // 1015FOLSOM
    $http.jsonp(a1015APIurl).success(function(data){
      
      var a1015data = data['results']['1015Folsom'];
      var formatted1015data = [];

      for(var i = 0; i < a1015data.length; i++){
        var formattedEventObj = formatEventObj(
          // date
          a1015data[i]['month'] + ' ' + a1015data[i]['day'],
          // artist 
          a1015data[i]['artist']['text'],
          // image
          a1015data[i]['image']['src'],
          // priceTime
          null,
          // url
          a1015data[i]['artist']['href']
        );
        formatted1015data.push(formattedEventObj);
      }
      $scope.a1015data = addCollectionName('1015 FOLSOM', formatted1015data);
      $scope.allVenues.push($scope.a1015data);
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
      $scope.fillmoreData = addCollectionName('THE FILLMORE', formattedFillmoreData);
      $scope.allVenues.push($scope.fillmoreData);
 		});

    // WARFIELD
    $http.jsonp(warfieldAPIurl).success(function(data){
      
      var warfieldData = data['results']['Warfield'];
      
      var formattedWarfieldData = [];
      
      for(var i = 0; i < warfieldData.length; i++){
        var formattedEventObj = formatEventObj(
          // date
          warfieldData[i]['date'],
          // artist
          warfieldData[i]['artist']['text'],
          // image
          warfieldData[i]['image']['src'],
          // priceTime
          warfieldData[i]['time'].replace('\n',' '),
          // url
          warfieldData[i]['artist']['href']        
        );

        formattedWarfieldData.push(formattedEventObj);       
      }
      $scope.warfieldData = addCollectionName('THE WARFIELD', formattedWarfieldData);
      $scope.allVenues.push($scope.warfieldData);
    });



});

// ADDITIONAL FUNCTIONS
var formatEventObj = function(date, artist, image, priceTime, url){
  var formattedEventObj = {};
  formattedEventObj.date      = date;
  formattedEventObj.artist    = artist;
  formattedEventObj.image     = image;
  formattedEventObj.priceTime = priceTime;
  formattedEventObj.url       = url;
  return formattedEventObj
}


/*

* @ay 9/3/15
* Standardize these schemas somehow
* Create functions that standardize these schemas? Separate out in different files?
* Put it up, make it live before I do any back end changes 

// ############################## MEZZANINE 

date ['date']
artist ['artist']['text']
image ['image']['src']
priceTime ['price']
url ['artist']['href']

{
  "date": "Wednesday, September 9",
  "artist": {
    "href": "http://mezzaninesf.com/events/gondwana/",
    "text": "Gondwana"
  },
  "link": {
    "href": "https://www.ticketfly.com/purchase/event/922765",
    "text": "Tickets"
  },
  "price": "$25 ADV · 8PM",
  "image": {
    "alt": "gondwana-levitando",
    "src": "http://mezzaninesf.com/app/uploads/2015/07/gondwana-levitando-220x190.jpg",
    "text": ""
  },
  "index": 1,
  "url": "http://mezzaninesf.com/events/"
}

// ############################## AUDIOSF

date ['date']['text']
artist ['artist']['text']
image ['image']['src']
priceTime ""
url ['artist']['href']

{
  "date": {
    "href": "http://www.audiosf.com/event/redondo-09-05/",
    "text": "09.05"
  },
  "artist": {
    "href": "http://www.audiosf.com/event/redondo-09-05/",
    "text": "REDONDO"
  },
  "link": {
    "href": "http://audiosf.electrostub.com/event.cfm?id=152052&cart",
    "text": "TICKETS"
  },
  "image": {
    "href": "http://www.audiosf.com/event/redondo-09-05/",
    "src": "http://static.audiosf.com/images/09051500.jpg",
    "text": ""
  },
  "index": 1,
  "url": "http://www.audiosf.com/events/"
}


// ############################## PUBLICWORKS

date : ['date']['text']
artist : ['artist']['text'] 
image : ['image']['src']
priceTime : ['time']['text']
url: ['artist']['href']

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
url : ['artist']['href']

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

// Independent info is from Songkick (bc Kimono couldnt scrape the official site)

date ['date']
artist ['artist']['text'].replace('/','')
image ['image']['src']
priceTime ""
url ['artist']['href']

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
  
  date ['month'] + ['day']
  artist ['artist']['text']
  image ['image']['src']
  priceTime ""
  url ['artist']['href']

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

  date ['date']
  artist ['artist']['text']
  image ['image']['src']
  priceTime ['time'].replace('/n','')
  url ['artist']['href']

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