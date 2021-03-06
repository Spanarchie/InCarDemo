var london = new google.maps.LatLng(51.502816, -0.126730);

var curloc = new google.maps.LatLng(51.489241,  -0.097513);
var incidentLoc = new google.maps.LatLng(51.488304,  -0.111491)


var patrol = [new google.maps.LatLng(51.502081, -0.140119), new google.maps.LatLng(51.507183, -0.127866), new google.maps.LatLng(51.500949,-0.126171)];
var markers = [];
var iterator = 0;
var step = 0;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

    
function initialize() {
   directionsDisplay = new google.maps.DirectionsRenderer();
   directionsDisplay.setOptions( { suppressMarkers: true } );
  var mapOptions = {
    zoom: 14,
    center: curloc
  };
  
  map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);
  directionsDisplay.setMap(map);


google.maps.event.addDomListener(window, 'load', initialize);
}


function drop() {
    loc = curloc;
    addMarker(loc);
  }

function DispLoc() {
  ShowLoc(curloc);
};


function stepper() {
    var x = patrol.length;
    var i = 0;
    var interval = setInterval(function() { 
        loc = patrol[i];
        addMarker(loc);
        i++;
        Router(patrol[i-1],patrol[i]);

        if(i >= patrol.length) clearInterval(interval);
    }, 1750);
};


function addMarker(loc) {
  var image = 'images/fight-fist.png';  
  markers.push(new google.maps.Marker({
    position: loc,
    map: map,
    title: "ABH / GBH",
    url: 'http://www.google.com/',
    draggable: false,
    icon: image
  }));
};

function ShowLoc(curloc) {
  var image = 'images/police_icon_30.png';  
  markers.push(new google.maps.Marker({
    position: loc,
    map: map,
    title: "Current Location",
    draggable: false,
    icon: image
  }));
};


// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
};


// Sets the map on all markers in the array.
function curLoc(curloc) {      
      var pos = curloc;
      var options = {
        zoom: 10,
        center: pos
      };
      var map = new google.maps.Map(document.getElementById("map"), options);
      // Remove the current marker, if there is one
      if (typeof(marker) != "undefined") marker.setMap(null);
      marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: "User location"
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });
    }























function clearMarkers() {
  setAllMap(null);
}

function Route() {
var start = curloc;
var end = incidentLoc;
var request = {
origin:start,
destination:end,
travelMode: google.maps.TravelMode.DRIVING
 };
 directionsService.route(request, function(result, status) {
if (status == google.maps.DirectionsStatus.OK) {
  directionsDisplay.setDirections(result);
} else { alert("couldn't get directions:"+status); }
});
addMarker(end);
} 


function Router() {
var start = new google.maps.LatLng(51.502081, -0.140119);;
var end = new google.maps.LatLng(51.501949,-0.127171);
  var point1 = new google.maps.LatLng(51.507183, -0.127866);
  var point2 = new google.maps.LatLng(51.500949,-0.126171);
  var point3 = new google.maps.LatLng(51.508183, -0.128866);

  var wps = [{ location: point1 }, { location: point2 }, { location: point3 }];
var request = {
  origin:start,
  destination:end,
  waypoints: wps,
  travelMode: google.maps.TravelMode.WALKING
 };
 directionsService.route(request, function(result, status) {
if (status == google.maps.DirectionsStatus.OK) {
  directionsDisplay.setDirections(result);
} else { alert("couldn't get directions:"+status); }
});
} 


function showPosition() {
    var marker;
    var infoWindow;
    if (navigator.geolocation) {
      var timeoutVal = 10 * 1000 * 1000;
      navigator.geolocation.watchPosition(
        displayPosition, 
        displayError,
        { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
      );
    }
    else {
      alert("Geolocation is not supported by this browser");
    }
    function displayPosition(position) {      
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var options = {
        zoom: 10,
        center: pos,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"), options);
      // Remove the current marker, if there is one
      if (typeof(marker) != "undefined") marker.setMap(null);
      marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: "User location"
      });
      var contentString = "<b>Timestamp:</b> " + parseTimestamp(position.timestamp) + "<br/><b>User location:</b> lat " + position.coords.latitude + ", long " + position.coords.longitude + ", accuracy " + position.coords.accuracy;
      // Remove the current infoWindow, if there is one
      if (typeof(infoWindow) != "undefined") infoWindow.setMap(null);
      infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });
    }
    function displayError(error) {
      var errors = { 
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
      };
      alert("Error: " + errors[error.code]);
    }
    function parseTimestamp(timestamp) {
      var d = new Date(timestamp);
      var day = d.getDate();
      var month = d.getMonth() + 1;
      var year = d.getFullYear();
      var hour = d.getHours();
      var mins = d.getMinutes();
      var secs = d.getSeconds();
      var msec = d.getMilliseconds();
      return day + "." + month + "." + year + " " + hour + ":" + mins + ":" + secs + "," + msec;
    }
}