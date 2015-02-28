Meteor.subscribe("shouts");

Session.set("WeatherSituation", "Please provide a location");
Session.set("locatie", false);

Meteor.startup(function(){
    Mapbox.load();
});

Tracker.autorun(function(){
  if(Mapbox.loaded()){
            L.mapbox.accessToken = "pk.eyJ1IjoiZGViYXplIiwiYSI6IldZTkJKRm8ifQ.yIrb5BtdpEKHBbhRz9sbPg";
            map = L.mapbox.map('map', "debaze.lb0ec7ma", {zoomControl: false}).setView([0.0252, 20], 1);
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            marker = L.marker([-1000,-1000], {  // Put marker out of sight
               icon: L.mapbox.marker.icon({'marker-color': '#f86767' })
            });
            marker.addTo(map);
  }
});

var updateMarker            // Move marker on map to new coordinates
updateMarker= function(){
          var coordArray = Session.get("coord");
           marker.setLatLng(coordArray);
           return marker.update();
}

Template.weather.helpers({
        forecast : function() {
        return Session.get("WeatherSituation");
        },

        locatie : function() {
        return Session.get("locatie");
        }
});

Template.shoutbox.helpers({
  shout: function(){
    var shoutCursor =  Shouts.find({}, {sort: {createdAt: 1}})
    return shoutCursor;
    },
    scrollDown: function(){     //Scrolldown to last shout
    Meteor.defer(function (){   //Wait until DOM is populated
      var content = document.getElementById('shoutContent');
      content.scrollTop = content.scrollHeight;
    });
 }
});

Template.body.events({
      'submit .LocationInput': function (event) {
        var placeInput = event.target.location.value;
        var place = placeInput.replace(/\s+/g, ''); //strip spaces from location string
        Session.set("locatie", placeInput);
        Session.set("WeatherSituation", "loading...");

        Meteor.call('getWeather', place,  function (err, result){
        if (result !== "error"){
          Session.set("WeatherSituation",result.desc + ", "+ Math.floor(result.temp - 273)+ "\xB0C");
          Session.set("coord", [result.lat, result.lon]);
          updateMarker();
        } else {
          Session.set("WeatherSituation", "No weather information for this location. Please try again");
          Session.set("locatie", false);
          Session.set("coord", [-1000, -1000]); //Hide marker
          updateMarker();
        }
        });

      return false;  //Avoid standard browser reload on form submit
      },

      'submit .new-shout' : function(event){
      var text = event.target.text.value;
      var name = event.target.name.value;
      Meteor.call("addShout", text, name);
      event.target.text.value="";  // reset shout input field to empty - placeholder
      return false;
      }
});
