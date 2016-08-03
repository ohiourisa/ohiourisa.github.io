var map = L.map('map', {
    center: [40.355,-82.656],
    zoom: 7,
    scrollWheelZoom: false,
    touchZoom: false,
    fullscreenControl: true,
});

var cdblight = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    maxNativeZoom: 18
}).addTo(map);

//L.hash(map);

var highlight = {
  color: '#d9534f',
  weight: 3,
  opacity: 1,
};

var defaultStyle = {
  color: '#001a33',
  fillColor: '#07f',
  weight: 2,
  opacity: 0.7,
  fillOpacity: 0.3,
};

var usergroups = new L.geoJson(null, {
  style: defaultStyle,
}).addTo(map);

$.getJSON( "/gis-data/ohiourisa_gis_ugs_simple_geojson.json", function( data ) {
  var usergroupData = new L.geoJson(data);
  usergroups.addData(usergroupData.toGeoJSON());
});

map.on('click', function() {
  usergroups.setStyle(defaultStyle);
});

/////////////get centroid
var getCentroid = function (arr) {
    return arr.reduce(function (x,y) {
      return [x[0] + y[0]/arr.length, x[1] + y[1]/arr.length]
    }, [0,0])
}

usergroups.on('click', function(e) {
  usergroups.setStyle(defaultStyle);
  var layer = leafletPip.pointInLayer(e.latlng, usergroups, false);
  var popupContent = "";
  for (var i = 0; i < layer.length; i++) {
    //console.log(layer[i]);
    prop = layer[i].feature.properties;
    popupContent += '<a href="' + prop.url + '" target="_blank"><h4>' + layer[i].feature.properties.usergroups + '</h4></a>';
    /*var array = [];
    for (x in layer[i]._latlngs) {
      array.push([layer[i]._latlngs[x].lat, layer[i]._latlngs[x].lng])
    }
    //console.log(array);
    var center = getCentroid(array);
    console.log(center);
    var label = L.marker(center, {
      icon: L.divIcon({
        iconSize: null,
        className: 'label',
        html: '<div style="color:black;font-size:14px;">' + prop.usergroups + '</div>'
      })
    }).addTo(map);*/
    layer[i].setStyle(highlight);
    layer[i].bringToFront();
  }
  var popup = L.popup();
  popup
    .setLatLng(e.latlng).setContent(popupContent)
    .openOn(map);
});

map.on('enterFullscreen', function(){
  map.scrollWheelZoom.enable();
  map.touchZoom.enable();
});

map.on('exitFullscreen', function(){
  map.scrollWheelZoom.disable();
  map.touchZoom.disable();
});
