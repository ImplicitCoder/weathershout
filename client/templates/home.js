Session.set("WeatherSituation", "Please provide a location");
Session.set("locatie", false);

Meteor.startup(function(){
    Mapbox.load();
});

Tracker.autorun(function(){
  if(Mapbox.loaded()){
            L.mapbox.accessToken = "pk.eyJ1IjoiZGViYXplIiwiYSI6IldZTkJKRm8ifQ.yIrb5BtdpEKHBbhRz9sbPg";
            map = L.mapbox.map('map', "debaze.lb0ec7ma", {zoomControl: false}).setView([0.0, 20], 1);
            map.dragging.disable();
            map.doubleClickZoom.disable();
            marker = L.marker([-1000,-1000], {  // Put marker out of sight
               icon: L.mapbox.marker.icon({'marker-color': '#f86767' })
            });
            marker.addTo(map);
  }
});
