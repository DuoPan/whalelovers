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
        
    downloadUrl('../php/Db_Connect.php', function (data) {
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
            divTag.style.display = 'none'; //Making Frame Visible when marker is selected
            document.getElementById('predictionFrame').style.display = 'block';     
        
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

    showDes(nameSearch,monSearch,locSearch);   
    
}

function showDes(nameSearch,monSearch,locSearch) {
    var mainDiv = document.getElementById('predictionFrame');
    while (mainDiv.firstChild) {
        mainDiv.removeChild(mainDiv.firstChild);
    }
    var preNameSearchMon={"Australian humpback dolphin":"Mar, Oct, Nov",
    "Australian snubfin dolphin":"Nov",
    "Blue whale":"Sep",
    "Common dolphin":"Apr",
    "Common bottlenose dolphin":"Mar, Oct, Nov",
    "Dwarf minke whale":"July, Sep",
    "Humpback whale":"Oct",
    "Killer whale":"July",
    "Southern right whale":"July, Aug",
    "Spinner dolphin":"Nov"};
    var preNameSearchLoc={"Australian humpback dolphin":"North and East",
    "Australian snubfin dolphin":"North",
    "Blue whale":"South West",
    "Common dolphin":"South and South East",
    "Common bottlenose dolphin":"North and South East",
    "Dwarf minke whale":"South East",
    "Humpback whale":"South East and North East",
    "Killer whale":"South and South East",
    "Southern right whale":"South and South East",
    "Spinner dolphin":"North and North East"};
    var div1 = document.createElement('div');
    div1.style.fontSize='20px';
    div1.style.padding='20px 20px 20px 20px';
    div1.style.verticalAlign='middle';
    var div1_1 = document.createElement('b');
    div1_1.innerHTML='Prediction Detail';
    var div1_2 = document.createElement('br');
    var div1_3 = document.createElement('div');
    div1_3.id='grad1';
    div1.appendChild(div1_1);
    div1.appendChild(div1_2);
    div1.appendChild(div1_3);
    mainDiv.appendChild(div1);

    if(nameSearch[0]==="allnames")
    {
        nameSearch = ["Australian humpback dolphin",
        "Australian snubfin dolphin",
        "Blue whale",
        "Common dolphin",
        "Common bottlenose dolphin",
        "Dwarf minke whale",
        "Humpback whale",
        "Killer whale",
        "Southern right whale",
        "Spinner dolphin"];
    }
   
    var preMonthFliter={"1":["Common bottlenose dolphin","Southern right whale","Humpback whale","Australian humpback dolphin","Common dolphin","Australian snubfin dolphin","Killer whale","Spinner dolphin"],
    "2":["Killer whale","Southern right whale","Common dolphin","Common bottlenose dolphin","Spinner dolphin","Australian humpback dolphin","Humpback whale","Australian snubfin dolphin","Blue whale"],
    "3":["Killer whale","Southern right whale","Common dolphin","Common bottlenose dolphin","Australian humpback dolphin","Humpback whale","Australian snubfin dolphin","Blue whale"],
    "4":["Australian humpback dolphin","Australian snubfin dolphin","Blue whale","Common dolphin","Common bottlenose dolphin","Dwarf minke whale","Humpback whale","Killer whale","Southern right whale","Spinner dolphin"],
    "5":["Australian humpback dolphin","Australian snubfin dolphin","Common dolphin","Common bottlenose dolphin","Dwarf minke whale","Humpback whale","Killer whale","Southern right whale"],
    "6":["Australian humpback dolphin","Australian snubfin dolphin","Common dolphin","Common bottlenose dolphin","Dwarf minke whale","Humpback whale","Killer whale","Southern right whale","Spinner dolphin"],
    "7":["Australian humpback dolphin","Australian snubfin dolphin","Common dolphin","Common bottlenose dolphin","Dwarf minke whale","Humpback whale","Killer whale","Southern right whale","Spinner dolphin"],
    "8":["Australian humpback dolphin","Australian snubfin dolphin","Common dolphin","Common bottlenose dolphin","Dwarf minke whale","Humpback whale","Killer whale","Southern right whale","Spinner dolphin"],
    "9":["Australian humpback dolphin","Australian snubfin dolphin","Blue whale","Common dolphin","Common bottlenose dolphin","Dwarf minke whale","Humpback whale","Killer whale","Southern right whale"],
    "10":["Australian humpback dolphin","Australian snubfin dolphin","Blue whale","Common dolphin","Common bottlenose dolphin","Humpback whale","Killer whale","Southern right whale","Spinner dolphin"],
    "11":["Australian humpback dolphin","Australian snubfin dolphin","Common dolphin","Common bottlenose dolphin","Dwarf minke whale","Humpback whale","Killer whale","Southern right whale","Spinner dolphin"],
    "12":["Australian humpback dolphin","Australian snubfin dolphin","Common dolphin","Common bottlenose dolphin","Dwarf minke whale","Humpback whale","Killer whale"]};
    if(monSearch[0]!=="allmonths")
    {
        var allnamesbymonth = [];
        monSearch.forEach(function(element) {
            preMonthFliter[element].forEach(function(singlename){
                var isexist=false;
                allnamesbymonth.forEach(function(existname){
                    if(existname === singlename)
                        isexist=true;
                });
                if(isexist===false)
                    allnamesbymonth.push(singlename);
            });
        }); 
   
        var all = ["Australian humpback dolphin",
        "Australian snubfin dolphin",
        "Blue whale",
        "Common dolphin",
        "Common bottlenose dolphin",
        "Dwarf minke whale",
        "Humpback whale",
        "Killer whale",
        "Southern right whale",
        "Spinner dolphin"];
        var outall = [];
        all.forEach(function(aname){
            if(nameSearch.includes(aname) && allnamesbymonth.includes(aname)){
                outall.push(aname);
            }  
        });
        nameSearch=outall;
        // console.log(nameSearch);
    }
  
    
    var preLocationFliter={"Jervis Bay Territory":["Southern right whale","Humpback whale"],
    "New South Wales":["Killer whale","Southern right whale","Common dolphin","Common bottlenose dolphin","Humpback whale","Blue whale","Dwarf minke whale"],
    "Northern Territory":["Killer whale","Common bottlenose dolphin","Australian humpback dolphin","Humpback whale","Australian snubfin dolphin","Spinner dolphin"],
    "Queensland":["Australian humpback dolphin","Australian snubfin dolphin","Common dolphin","Common bottlenose dolphin","Dwarf minke whale","Humpback whale","Killer whale","Southern right whale","Spinner dolphin"],
    "South Australia":["Common dolphin","Common bottlenose dolphin","Dwarf minke whale","Humpback whale","Killer whale","Southern right whale"],
    "Tasmania":["Common dolphin","Common bottlenose dolphin","Humpback whale","Killer whale","Southern right whale"],
    "Victoria":["Common dolphin","Common bottlenose dolphin","Dwarf minke whale","Humpback whale","Killer whale","Southern right whale"],
    "Western Australia":["Blue whale","Common bottlenose dolphin","Humpback whale","Killer whale","Southern right whale"]};
    
    if(locSearch[0]!=="alllocs")
    {
        var allnamesbymonth = [];
        locSearch.forEach(function(element) {
            preLocationFliter[element].forEach(function(singlename){
                var isexist=false;
                allnamesbymonth.forEach(function(existname){
                    if(existname === singlename)
                        isexist=true;
                });
                if(isexist===false)
                    allnamesbymonth.push(singlename);
            });
        }); 
   
        var all = ["Australian humpback dolphin",
        "Australian snubfin dolphin",
        "Blue whale",
        "Common dolphin",
        "Common bottlenose dolphin",
        "Dwarf minke whale",
        "Humpback whale",
        "Killer whale",
        "Southern right whale",
        "Spinner dolphin"];
        var outall = [];
        all.forEach(function(aname){
            if(nameSearch.includes(aname) && allnamesbymonth.includes(aname)){
                outall.push(aname);
            }  
        });
        nameSearch=outall;
        //console.log(nameSearch);
    }

    if(nameSearch.length === 0){
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
    }

    nameSearch.forEach(function(element) {
        var detail = preNameSearchMon[element];
        var locDetail = preNameSearchLoc[element];
        var b = document.createElement('strong');
        b.innerHTML=element;
        b.classList.add("predictionTitle");
        var c = document.createElement('small');
        var d = document.createElement('small');
        d.innerHTML=detail;
        c.innerHTML="Most likely to be seen: ";
        c.classList.add("predictionSub");
        d.classList.add("predictionMon");
        var e = document.createElement('small');
        var f = document.createElement('small');
        e.innerHTML=" at ";
        f.innerHTML=locDetail;
        f.classList.add("predictionMon");
        var br1 = document.createElement('br');
        var br2 = document.createElement('br');
        mainDiv.appendChild(b);
        mainDiv.appendChild(br1);
        mainDiv.appendChild(c);mainDiv.appendChild(d);mainDiv.appendChild(e);mainDiv.appendChild(f);
        mainDiv.appendChild(br2);
    }); 
    
    


   // mainDiv.appendChild(ulText);
}
