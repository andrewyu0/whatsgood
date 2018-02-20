// Apr 27 2016
// https://gist.github.com/micahasmith/1258260

function PeopleRepository(){

  this.Get = function(callback){
    $.getJSON("some url", callback);
  }

}

// instance new repo
var repo = new PeopleRepository();
repo.Get(function(data){
  // do something with data that gets returned here
});
