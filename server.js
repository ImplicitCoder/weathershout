Meteor.methods({
  getWeather : function(location){
      // if-loop provided to prevent method without callback from running client-side (there's a stub)
      // callback provided on client side while calling getWeather method
      if (Meteor.isServer){
        var output = HTTP.call("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + location );
        var parsedOut = JSON.parse(output.content);
        if(parsedOut.cod == "200"){
        var respForecast = {desc: parsedOut.weather[0].description,
                            temp: parsedOut.main.temp,
                            lon: parsedOut.coord.lon,
                            lat: parsedOut.coord.lat}
        }else{
          var respForecast = "error";
        }
        console.log(respForecast);
        return respForecast;
      }
  }
});

Meteor.publish("shouts", function() {
  return Shouts.find()
});

