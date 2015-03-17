Template.detailedForecastModal.helpers({
          detforecast : function(){
            return Session.get("detForecast");
          },
          location : function(){
            return Session.get("locatie");
          }
});



