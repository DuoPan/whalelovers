//console.log("run in map_search.js");
function search() {
    var toSearch = document.getElementById("whale-select").value;
    clearMap();
    var imgLoc = './assets/images/smallDesc/'
    var infoWindow = new google.maps.InfoWindow;
    downloadUrl('./Db_Connect.php', function (data) {
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName('marker');
        Array.prototype.forEach.call(markers, function (markerElem) {
            var name = markerElem.getAttribute('name');
            var year = markerElem.getAttribute('year');
            var point = new google.maps.LatLng(
                parseFloat(markerElem.getAttribute('lat')),
                parseFloat(markerElem.getAttribute('lng')));

            var infowincontent = document.createElement('div');
            var heading = document.createElement('strong');
            var yearFound = document.createElement('text');
            yearFound.textContent = year;
            heading.textContent = name;
            infowincontent.appendChild(heading);
            infowincontent.appendChild(document.createElement('br'));
            infowincontent.appendChild(yearFound);
            //infowincontent.appendChild(document.createElement('br'));
            //var text = document.createElement('text');
            //infowincontent.appendChild(text);  

            var marker = new google.maps.Marker({ position: point, icon: './assets/images/whale.png' });
            google.maps.event.addListener(marker, 'click', function (evt) {
                //Sample Click Event
                infoWindow.setContent(infowincontent);
                infoWindow.open(map, marker);
                var defaultDivTag = document.getElementById('defaultFrame');
                defaultDivTag.style.display = 'none'; //Hiding Default Frame when Marker is selected
                var divTag = document.getElementById('markerSelectFrame');
                divTag.style.display = 'block'; //Making Frame Visible when marker is selected
                var imgSrc = document.getElementById('img_desc');
                var imgdesc = document.getElementById('pdesc');
                imgSrc.src = imgLoc + name.trim() + '.png';
                document.getElementById('knowmore').value = name.trim();
                for (var i = 0; i < hb1.length; i = i + 1) {
                    if (hb1[i][0] == name.trim()) {
                        imgdesc.innerHTML = hb1[i][1];
                    }
                }
            });
            if(name == toSearch){
                allmarkers.push(marker);
            }
        });
        markerCluster = new MarkerClusterer(map, allmarkers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
    });
    setTimeout(function(){ recenter(); }, 200);
}

function clearMap() {
    markerCluster.removeMarkers(allmarkers);
    for (var i = 0; i < allmarkers.length; ++i) {
        allmarkers[i].setMap(null);
        allmarkers[i] = null;
    }
    allmarkers.length = 0;
}


function recenter() {
    var center = new google.maps.LatLng(-25.2744, 133.7751);
    map.panTo(center);
    map.setZoom(4);
}