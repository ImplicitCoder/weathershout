Meteor.methods({
  getWeather : function(location){
      // if-loop provided to prevent method without callback from running client-side (as a stub)
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
  },

  getDetailedForecast : function(location){
     if (Meteor.isServer){
        var output = HTTP.call("GET", "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + location + "&mode=JSON&units=metric&cnt=3" );
        var parsedOut = JSON.parse(output.content);
        if(parsedOut.cod == "200"){
        var respondedForecast = {desc1: parsedOut.list[0].weather[0].description,
                            temp1: parsedOut.list[0].temp.max,
                            desc2: parsedOut.list[1].weather[0].description,
                            temp2: parsedOut.list[1].temp.max,
                            desc3: parsedOut.list[2].weather[0].description,
                            temp3: parsedOut.list[2].temp.max
                            }
        }else{
          var respForecast = "error";
        }
        console.log(respForecast);
        return respondedForecast;
    }
  }
});

Meteor.publish("shouts", function() {
  return Shouts.find()
});

