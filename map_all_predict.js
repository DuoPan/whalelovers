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
  downloadUrl('./Db_Connect_predict.php', function(data) {
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

	
    downloadUrl('./Db_Connect_predict.php', function (data) {
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
			confirm("No Records Found...!!")
		    return;
		}
		
		var neededData;
		var locData = [];
		//getting Prediction Details DATA
		var statesData = $.getJSON('./getData.php',function(jsonData){
			neededData = jsonData
			neededData.forEach(function(pdata){ 
				var whaleName = JSON.stringify(pdata.Whales)
				//Comparing whale name
				searchName.forEach(function(sname){
					if(whaleName === "\""+sname+"\""){
						locData.push(pdata.State)
					}//End of IF
				})//End of NameSearch
			})//End of JSON data
			//console.log(locData)
			loadMarkers(locData)
		});
		//map.setZoom(13);
		heatmap = new google.maps.visualization.HeatmapLayer({
			data: heatmapData,
			dissipating:true,
			maxIntensity:10,
			map: map
		});
		
    });	
	
}

function loadMarkers(locData){
	var dbLocPlaces = [];
	var ausStates = [];
	$.getJSON('./predictionplace.php',function(jsonData){
		jsonData.forEach(function(statePlace){
			var state = statePlace.State
			locData.forEach(function(pstate){
				if(pstate === state){
					var str = statePlace.Spots.split(",")
					for(var i = 0; i< str.length; i++){
						dbLocPlaces.push(str[i]+","+pstate)
					}
				}
			})//Search finish
		})//state search end		
		drop(dbLocPlaces)
	})//Prediction place end
}

function drop(dbLocPlaces){
	
	var geocoder =  new google.maps.Geocoder();
	dbLocPlaces.forEach(function(element){
		//console.log("Entered..:"+element)
		geocoder.geocode({'address': ''+element+',Australia'},function(results,status){
			if (status == google.maps.GeocoderStatus.OK) {
				var latLng = new google.maps.LatLng(results[0].geometry.location.lat(),results[0].geometry.location.lng())
				addMarkerWithTimeout(latLng, dbLocPlaces.length * 200,element);
			}
		})	
		//console.log(latLngPlaces.length)
	})
	
    
}

function addMarkerWithTimeout(position, timeout,name){
	window.setTimeout(function() {
        markers.push(new google.maps.Marker({
			position: position,
			map: map,
			title: name,
			animation: google.maps.Animation.DROP
        }));
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