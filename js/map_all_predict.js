function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
  center: new google.maps.LatLng(-25.2744, 133.7751),
  zoom: 4,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  //     scrollwheel: false
  });
  var imgLoc = './assets/images/smallDesc/'
  var infoWindow = new google.maps.InfoWindow;
  //Reading Php File
  downloadUrl('./php/Db_Connect_predict.php', function(data) {
      var xml = data.responseXML;
      var markers = xml.documentElement.getElementsByTagName('marker');
      Array.prototype.forEach.call(markers, function(markerElem) {
        var name = markerElem.getAttribute('name');
        var year = markerElem.getAttribute('year');
        var point = new google.maps.LatLng(parseFloat(markerElem.getAttribute('lat')),
										   parseFloat(markerElem.getAttribute('lng')));

			heatmapData.push(point);
        
        });
		heatmap = new google.maps.visualization.HeatmapLayer({
			data: heatmapData,
			dissipating:true,
			maxIntensity:10,
			map: map
		});
		
  });

  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);
  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
  centerControlDiv.dataToggle="tooltip";
  centerControlDiv.title="Back to Default View!";
}

function downloadUrl(url, callback) {
    var request = window.ActiveXObject ?
      new ActiveXObject('Microsoft.XMLHTTP') :
      new XMLHttpRequest;

    request.onreadystatechange = function() {
      if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
      }
    };

    request.open('GET', url, true);
    request.send(null);
}

function doNothing(){}

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

function searchMap(){
    recenter();

	var searchName = $('#search-select-name').val()
	if(searchName === null){
		searchName = ["allnames"]
	}
	
	var monSearch = [];
	$(".form-check-input:checked").each(function () {
		monSearch.push($(this).val());
	});
	
	if(monSearch.length === 0){
		monSearch = ["allmonths"] 
	}
	
	search_advance(searchName,monSearch)
}

function search_advance(searchName,monSearch){
	clearMarkers();
	
	if(!!heatmap && !!heatmap.setMap){
			heatmap.setMap(null);
			heatmapData = [];
	}

	
    downloadUrl('./php/Db_Connect_predict.php', function (data) {
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName('marker');
        Array.prototype.forEach.call(markers, function (markerElem) {
            var name = markerElem.getAttribute('name');
            var year = markerElem.getAttribute('year');
            var state = markerElem.getAttribute('state');
			var month = markerElem.getAttribute('month');
            var point = new google.maps.LatLng(
                parseFloat(markerElem.getAttribute('lat')),
                parseFloat(markerElem.getAttribute('lng')));
				
			if(searchName[0]!== "allnames")
            {
                var isNameExist = false;
                searchName.forEach(function(element) {
                    if(name === element){
                        isNameExist = true;
                    }
                }); 
                if(!isNameExist)
                    return;
            }
			
			
			if(monSearch[0]!=="allmonths")
            {
                var isMonthExist = false;
                monSearch.forEach(function(element) {
                    if(month === element){
                        isMonthExist = true;
                    }
                }); 
                if(!isMonthExist)
                    return;
            }
			
			heatmapData.push(point);
			//console.log(heatmapData)
        });	
		
		if(heatmapData.length === 0){
			var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
		    return;
		}
		
		var neededData;
		var locData = [];
		var whales = [];
		var operators = [];
		var predicition = $.getJSON('./php/getData.php',function(jsonData){
			neededData = jsonData
			neededData.forEach(function(dbdata){
				var whaleName = JSON.stringify(dbdata.Whale)
				var dbmonth = dbdata.months
				var i =0
				//check in the document for location
				searchName.forEach(function(sname){
					  var isNameExist = false;
					if(whaleName === "\""+sname+"\"" ){
						monSearch.forEach(function(smon){
							if(smon === dbmonth){
								//console.log("smon "+smon+"dbmonth "+dbmonth)
								locData.push(dbdata.location)
								whales.push(dbdata.Whale)
								operators.push(dbdata.Operator)
							}
						})
					}
				}) // Search Name
			})// Data close
			loadMarkers(locData,whales,operators)
		}); // Get Json close
		
		heatmap = new google.maps.visualization.HeatmapLayer({
			data: heatmapData,
			dissipating:true,
			maxIntensity:10,
			map: map
		});
		
    });	
	
}

function loadMarkers(locData,whales,operators){
	clearMarkers();
	for (var i = 0; i < locData.length; i++) {
        drop(locData[i],whales[i],operators[i])
    }
}

function drop(dbLocPlaces,whaleN,operatorInfo){
	var geocoder =  new google.maps.Geocoder();
	geocoder.geocode({'address': ''+dbLocPlaces+',Australia'},function(results,status){
        if (status == google.maps.GeocoderStatus.OK) {
            var latLng = new google.maps.LatLng(results[0].geometry.location.lat(),results[0].geometry.location.lng())
            addMarkerWithTimeout(latLng, 200,dbLocPlaces,whaleN,operatorInfo);
        }
	})
}

var prevInfoWindow=null;

function addMarkerWithTimeout(position, timeout,dbLocPlaces,whaleN,operatorInfo){
	window.setTimeout(function() {
		var infowincontent = document.createElement('div');
	    var heading = document.createElement('strong');
		var locationText =  document.createElement('Text');
		var operatorText =  document.createElement('Text');
		var btn = document.createElement('Button');
		locationText.textContent = "Location: "+dbLocPlaces;
		operatorText.textContent = "Tour Operator: "+operatorInfo;
		btn.appendChild(document.createTextNode("Add To List"));
		btn.setAttribute("class","btn btn-primary btn-sm");
		btn.onclick = addToList;
		heading.textContent = whaleN;
		infowincontent.appendChild(heading);
		infowincontent.appendChild(document.createElement('br'));
        infowincontent.appendChild(locationText);
		infowincontent.appendChild(document.createElement('br'));
		infowincontent.appendChild(operatorText);
		infowincontent.appendChild(document.createElement('br'));
		infowincontent.appendChild(document.createElement('br'));
		infowincontent.appendChild(btn);
		var infoWindow = new google.maps.InfoWindow({
			content: infowincontent
		});
		
		var marker = new google.maps.Marker({
			position: position,
			map: map,
			animation: google.maps.Animation.DROP
        })
        
		google.maps.event.addListener(marker, 'click', function() {
              if(prevInfoWindow !== null)
                prevInfoWindow.close();
              infoWindow.open(map, marker);
              prevInfoWindow = infoWindow;
		});
		markers.push(marker);	
    }, timeout);
}

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

function recenter() {
    var center = new google.maps.LatLng(-25.2744, 133.7751);
    map.panTo(center);
    map.setZoom(4);
}

function addToList() {
    var info = document.getElementById("addedList");
    if(info.innerText === "") {
        document.getElementById("rightImg").classList.add("hidden");
        document.getElementById("rightDes").classList.add("hidden");
        document.getElementById("rightTop").classList.remove("hidden");
		document.getElementById("dnwld").classList.remove("hidden");
    } 
    var t = prevInfoWindow.content.innerText.split('\n');
	console.log(t)
    this.style.display = "none";
    var t2 = t[1].split(':');
    var t3 = t2[1].split(',');
	var opDisplay = t[2].split(':');
    info.innerHTML= info.innerHTML + "<strong>"+ t[0] + "</strong>" + 
					"<p>Locations: <a target='_blank' href='https://www.google.com/maps/search/?api=1&query="+t3[0]+"+"+t3[1]+"'>"+ t2[1]+
					"</a><br>Tour Operator: "+opDisplay[1]+"&nbsp &nbsp <img src='../assets/images/webicon.png'></img></p>";
}