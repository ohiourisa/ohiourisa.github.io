var map = L.map('map', {
    center: [39.160, -82.964080],
    zoom: 10,
    scrollWheelZoom: false,
    touchZoom: false,
});
var cdblight = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    maxNativeZoom: 18
}).addTo(map);
