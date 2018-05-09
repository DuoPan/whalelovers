var customLabel = {
    restaurant: {
      label: 'R'
    },
    bar: {
      label: 'B'
    }
  };
  var hb1 = [
    ['Humpback whale','Humpback whales are one of the most common species of whale you will see in Australian waters and are well known for their spectacular breaching behaviour. '],
    ['Common dolphin','Common Dolphins are slender, with a long beak protruding sharply from the head. The dorsal fin is high and curves backwards.'],
    ['Australian humpback dolphin','Australian humpback dolphins are usually grey with various white scarring and dark flecking in some areas. '],
    ['Australian snubfin dolphin','The Australian snubfin dolphin is characterised by a broadly rounded head that is extremely mobile and usually has a visible neck crease. '],
    ['Blue whale','Blue whales are the largest animal on earth with an average length of 24 meters and a weight of up to 136 tonnes.'],
    ['Common bottlenose dolphin','The common bottlenose dolphin is grey in colour and grows to between 2 and 4 meters long. It has a short rounded snout, described as bottle-shaped.'],
    ['Dwarf minke whale','The dwarf minke whale is the smallest baleen (filter feeding) whale, reaching less than 8m long.'],
    ['Killer whale','Killer whales are the largest member of the dolphin family and are recognisable by their distinctive black, white and grey colouration. '],
    ['Southern right whale','The southern right whale is a large whale that is easily distinguished from others because of its broad back without a dorsal fin, and wide pectoral fins'],
    ['Spinner dolphin','The spinner dolphin is a slender dolphin with an extremely long, thin beak. The dorsal fin ranges from slightly sickle-shaped to being erect and triangular.']
  ];

var userMarkers = {};

function initMap() {
  map = new google.maps.Map(document.getElementById('gallery_map'), {
    center: new google.maps.LatLng(-25.2744, 133.7751),
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  var imgLoc = './assets/images/smallDesc/';
  var infoWindow = new google.maps.InfoWindow;
  
  //Reading Php File
  downloadUrl('./Db_Connect.php', function(data) {
    var xml = data.responseXML;
    var markers = xml.documentElement.getElementsByTagName('marker');
    Array.prototype.forEach.call(markers, function(markerElem,index) {
      var name = markerElem.getAttribute('name');
      var year = markerElem.getAttribute('year');
      var point = new google.maps.LatLng(
        parseFloat(markerElem.getAttribute('lat')),
        parseFloat(markerElem.getAttribute('lng')));
      var user_marker_key = markerElem.getAttribute('city');
      if (user_marker_key.includes('.')){
        userMarkers[user_marker_key] = index;
      }
      var infowincontent = document.createElement('div');
      var heading = document.createElement('strong');
      var yearFound = document.createElement('text');
      var whaleImg = document.createElement('img');
      var knowmoreBtn = document.createElement('button');
      infowincontent.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
      yearFound.textContent = year;
      if(name.includes('-user')){
        var temp = name.split('-');
        heading.textContent = temp[0];
        knowmoreBtn.addEventListener("click", function(){
          temp[0] = temp[0].replace(/ /g, "_");
          location.href = "./type_page.html#" + temp[0];
        });
      }else{
        if(name !== "other" && name !== "Other"){
          heading.textContent = name;
          knowmoreBtn.addEventListener("click", function(){
            name = name.replace(/ /g, "_");
            location.href = "./type_page.html#" + name.trim();
          });
        }
        else{
          heading.textContent = "Unknown (User Uploded)";
        }
      }
      knowmoreBtn.innerHTML = "Know More";
      knowmoreBtn.style.marginTop = "10px";
      knowmoreBtn.style.marginLeft = "40%";
      knowmoreBtn.classList.add("btn-sm");
      knowmoreBtn.classList.add("btn-primary");
      whaleImg.style.width = "320px";
      infowincontent.appendChild(heading);
      infowincontent.appendChild(document.createElement('br'));
      infowincontent.appendChild(yearFound);
      infowincontent.appendChild(document.createElement('br'));
      infowincontent.appendChild(whaleImg); 
        
      if(name.includes('-user') || name === "other" || name === "Other") {
        whaleImg.src = './assets/photos/'+markerElem.getAttribute('city');
      }
      else {
        whaleImg.src = imgLoc+name.trim()+'.png';
      }

      if (name !== "other" && name !== "Other") {
        infowincontent.appendChild(document.createElement('br'));
        infowincontent.appendChild(knowmoreBtn); 
      }

      var marker = new google.maps.Marker({position: point,icon: './assets/images/whale.png'}); 	
      google.maps.event.addListener(marker, 'click', function(evt) {
        //Sample Click Event

        infoWindow.setContent(infowincontent);
        infoWindow.open(map, marker);
      });
      allmarkers.push(marker);
    });
    markerCluster = new MarkerClusterer(map,allmarkers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  });
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);
  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
  centerControlDiv.dataToggle="tooltip";
  centerControlDiv.title="Back to Default View!";

  // second map
  postmapCenter = new google.maps.LatLng(-25.2744, 133.7751);
  postmap = new google.maps.Map(document.getElementById('postMap'), {
      center: postmapCenter,
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  postmapInfoWindow = new google.maps.InfoWindow();
  postmapMarker=new google.maps.Marker({
  
  });
  google.maps.event.addListener(postmap, 'click', function(event) {
      placeMarker(event.latLng);
  });
}

function downloadUrl(url, callback) {
  var request = window.ActiveXObject ?
    new ActiveXObject('Microsoft.XMLHTTP') :
    new XMLHttpRequest;

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
    request.onreadystatechange = function(){};
    callback(request, request.status);
    }
  };

  request.open('GET', url, true);
  request.send(null);
}
  

function CenterControl(controlDiv, map) {
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginRight = '10px';
  controlUI.style.textAlign = 'center';
  controlUI.style.width = '28px';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('i');
  controlText.classList.add("glyphicon");
  controlText.classList.add("glyphicon-screenshot");
  controlText.style.fontSize = '20px';
  controlUI.appendChild(controlText);

  controlUI.addEventListener('click', function() {
    recenter();
  });
}

function recenter() {
  var center = new google.maps.LatLng(-25.2744, 133.7751);
  map.panTo(center);
  map.setZoom(4);
}

function showGallerySpot(filename) {
  loadFromDBOnePara('./DB_LatlngByFilename.php', filename, function(data) {
    var xml = data.responseXML;
    var markers = xml.documentElement.getElementsByTagName('marker');
    var latt = markers[0].getAttribute('lat');
    var lngg = markers[0].getAttribute('lng');
    var center = new google.maps.LatLng(latt, lngg);
    map.panTo(center);
    map.setZoom(8);
    google.maps.event.trigger(allmarkers[userMarkers[filename]], 'click');
  });
  location.href = "./gallery.html#gallery_map";
}

function resizeMap() {
  postmapMarker.setMap(null);
  google.maps.event.trigger(postmap, "resize");
  postmap.panTo(postmapCenter);
  postmap.setZoom(4); 
}

function placeMarker(location) {
  postmapMarker.setMap(null);
  postmapMarker = new google.maps.Marker({
      position: location, 
      map: postmap,
      icon: './assets/images/whale.png'
  });
  var infowincontent = document.createElement('div');
  infowincontent.style.paddingRight='20px';
  infowincontent.textContent="lat: "+parseFloat(location.lat().toFixed(6))+", lng: "+parseFloat(location.lng().toFixed(6));

  postmapInfoWindow.setContent(infowincontent);
  postmapInfoWindow.open(postmap, postmapMarker);
}

