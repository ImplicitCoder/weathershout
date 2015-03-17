Template.weather.helpers({
        forecast : function() {
        return Session.get("WeatherSituation");
        },

        locatie : function() {
        return Session.get("locatie");
        }
});
var updateMarker            // Move marker on map to new coordinates
updateMarker= function(){
          var coordArray = Session.get("coord");
           marker.setLatLng(coordArray);
           return marker.update();
}

Template.weather.events({ //Get weather forecast after location is set and display in modal"

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


      'click button': function(event){
      var _locatie = Session.get("locatie");
      Session.set("detForecast", [{content:"loading..."}, {content:"loading..."}, {content:"loading..."}])
        Meteor.call('getDetailedForecast', _locatie, function(err, result){
          if (result !=="error"){
            var today = new moment();
            var afterTomorrow = moment().add(2,'days').format("dddd");
            var twoAfterTomorrow = moment().add(3, 'days').format("dddd");
            var detailedArr = [];
            detailedArr[0] = {"content" : "Tomorrow: " + result.desc1 + ", "+ Math.floor(result.temp1)+ "\xB0C"};
            detailedArr[1] = {"content" : afterTomorrow + ": " + result.desc2 +", "+ Math.floor(result.temp2)+ "\xB0C"};
            detailedArr[2] = {"content" : twoAfterTomorrow + ": " + result.desc3  + ", "+ Math.floor(result.temp3)+ "\xB0C"};
            Session.set("detForecast", detailedArr);
          }else{
               Session.set("detForecast", false);
          }
        });
      }
});

