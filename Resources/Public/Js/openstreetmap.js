var map;
var oms;
var cluster;

function initializeMap() {
    map = L.map('map_canvas', {
        center: myOptions.center,
        zoom: myOptions.zoom,
        zoomControl: myOptions.zoomControl,
        scrollWheelZoom: myOptions.scrollwheel
    });

    if (myOptions.scaleControl) {
        L.control.scale().addTo(map);
    }

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    oms = new OverlappingMarkerSpiderfier(map, {
        keepSpiderfied: true
    });

    var popup = new L.Popup();
    oms.addListener('click', function(marker) {
        popup.setContent(marker.desc);
        popup.setLatLng(marker.getLatLng());
        map.openPopup(popup);
    });

    oms.addListener('spiderfy', function(markers) {
        map.closePopup();
    });

    cluster = L.markerClusterGroup();

    for (var i = 0, dataOrt; dataOrt = daten.orte[i]; i++) {
        var latLng = new L.LatLng(dataOrt.lat, dataOrt.lng);
        var marker = new L.Marker(latLng, {
            title: dataOrt.titel,
            icon: icons[dataOrt.imageId]
        });
        marker.desc = dataOrt.info;
        cluster.addLayer(marker);
    }

    map.addLayer(cluster);
}