function search() {
    document.getElementById("back-to-spot").classList.remove("hidden");
    var nameSearch = $('#search-select-name').val()
    var locSearch = $('#search-select-loc').val()
    var monSearch = $('#search-select-month').val()
	
    if(nameSearch === null)
    {
        nameSearch=["allnames"]; 
    }
    if(monSearch === null)
	{
		monSearch = ["allmonths"];
	}
    if(locSearch === null)
    {
        locSearch=["alllocs"]; 
    }
    search_advance(nameSearch, monSearch, locSearch);
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

function search_advance(nameSearch, monSearch, locSearch)
{
    clearMap();
    var imgLoc = './assets/images/smallDesc/'
    var infoWindow = new google.maps.InfoWindow;

    if(!!heatmap && !!heatmap.setMap){
		heatmap.setMap(null);
		heatmapData = [];
    }
        
    downloadUrl('./Db_Connect.php', function (data) {
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

            var defaultDivTag = document.getElementById('defaultFrame');
            defaultDivTag.style.display = 'none'; //Hiding Default Frame when Marker is selected
            var divTag = document.getElementById('markerSelectFrame');
            divTag.style.display = 'block'; //Making Frame Visible when marker is selected
                
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
            
            if(nameSearch[0]!=="allnames")
            {
                var isNameExist = false;
                nameSearch.forEach(function(element) {
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
				monSearch.forEach(function(element){
					if(month === element){
						isMonthExist = true;
					}
				});
				if(!isMonthExist)
					return;
            }

            if(locSearch[0]!=="alllocs")
            {
                var isLocExist = false;
                locSearch.forEach(function(element) {
                    if(state === element){
                        isLocExist = true;
                    }
                }); 
                if(!isLocExist)
                    return;
            }

            heatmapData.push(point);
        });
        //map.setZoom(13);
        if(heatmapData.length === 0){
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
        }
        heatmap = new google.maps.visualization.HeatmapLayer({
			data: heatmapData,
			dissipating:true,
			maxIntensity:10,
			map: map
        });
    });
    setTimeout(function(){ recenter(); }, 200);
}



            