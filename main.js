var latitude;
var longitude;
var destination;

$(document).ready(function () {
  alert("Please allow location tracking.");
  initGeolocation();
});

$(function () {
  $("#navigate-button").click(function () {
    window.location.href = `ar_navigation.html?source=${latitude};${longitude}&destination=${destination.lat};${destination.lng}`;
  });
});

function initGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
  } else {
    alert("Sorry your browser does not support geolocation services.");
  }
}

function success(mylocation) {
  console.log(mylocation);

  longitude = mylocation.coords.longitude;
  latitude = mylocation.coords.latitude;

  mapboxgl.accessToken =
    "pk.eyJ1IjoieWFtdW5hMTIzIiwiYSI6ImNsMWRhcHY3ejA4ZGoza24zazdrNmNmaGwifQ.t-kPX15gsZG7azvrzyHfZA";

  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [longitude, latitude],
    zoom: 16,
  });

  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })
  );

  map.addControl(
    new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    }),
    "top-left"
  );

  map.on("click", function (e) {
    console.log(e);
    destination = e.lngLat;
  });
}
//initialise mapbox
