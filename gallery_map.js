var postmap;
var myCenter;
var marker;
var infoWindow;

function initMap() {
    myCenter = new google.maps.LatLng(-25.2744, 133.7751);
    postmap = new google.maps.Map(document.getElementById('postMap'), {
        center: myCenter,
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    infoWindow = new google.maps.InfoWindow();
    marker=new google.maps.Marker({
    
    });
    google.maps.event.addListener(postmap, 'click', function(event) {
        placeMarker(event.latLng);
    });
}

$('#uploadModal').on('shown.bs.modal', function () {
    resizeMap();
});

function resizeMap() {
    marker.setMap(null);
    google.maps.event.trigger(postmap, "resize");
    postmap.panTo(myCenter);
    postmap.setZoom(4); 
}

function placeMarker(location) {
    marker.setMap(null);
    marker = new google.maps.Marker({
        position: location, 
        map: postmap,
        icon: './assets/images/whale.png'
    });
    var infowincontent = document.createElement('div');
    // var lat = document.createElement('div');
    // var lng = document.createElement('div');
    // lat.textContent=parseFloat(location.lat().toFixed(6));
    // lng.textContent=parseFloat(location.lng().toFixed(6));
    // infowincontent.appendChild(lat);
    // infowincontent.appendChild(lng);
    infowincontent.style.paddingRight='20px';
    infowincontent.textContent="lat: "+parseFloat(location.lat().toFixed(6))+", lng: "+parseFloat(location.lng().toFixed(6));

    infoWindow.setContent(infowincontent);
    infoWindow.open(postmap, marker);
}