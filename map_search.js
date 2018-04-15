function search() {
    document.getElementById('date-alert').classList.add("hidden");

    var nameSearch = $('#search-select-name').val()
    var dateStart = Date.parse(document.getElementById('date-start-input').value);
    var dateEnd = Date.parse(document.getElementById('date-end-input').value);
    var loc = document.getElementById('pac-input').value;
    
    
    if(nameSearch === null)
    {
        nameSearch=["allnames"]; 
        //document.getElementById('search-select-name-label').innerHTML='Please select at least one name';
        //document.getElementById('search-select-name-label').style="color:red";
    }
    if(!dateStart)
    {
        dateStart = Date.parse('1999-12-31');
    }
    if(!dateEnd)
    {
        var today = new Date();
        var dd = today.getDate();
        var yyyy = today.getFullYear();
        var mm = today.getMonth()+1; //January is 0!
        if(dd<10) {
            dd = '0'+dd;
        }
        if(mm<10) {
            mm = '0'+mm
        } 
        today = yyyy + '-' + mm + '-' + dd;
        dateEnd = Date.parse(today);
    }
    if(!verifyDate(dateStart, dateEnd))
    {
        document.getElementById('date-alert').classList.remove("hidden");
        return;
    }

    search_advance(nameSearch, dateStart, dateEnd, loc);
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

function search_advance(nameSearch, dateStart, dateEnd, loc)
{
    clearMap();
    var imgLoc = './assets/images/smallDesc/'
    var infoWindow = new google.maps.InfoWindow;
    if(loc == "")
    {//searchWithoutLoc()
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
                var thisDate = trasformYear(year);
                if(thisDate < dateStart || thisDate > dateEnd)
                {
                    return;
                }

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
                allmarkers.push(marker);
            });
            markerCluster = new MarkerClusterer(map, allmarkers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
        });
        setTimeout(function(){ recenter(); }, 200);
    }else{//searchWithLoc()
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+loc+"&key=AIzaSyAnBwZbNOuAY_LK2r-QFWA6u0y5B5EVpDY")
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            var locationSearch= myJson['results'][0]['geometry']['location'];
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
                    var thisDate = trasformYear(year);
                    if(thisDate < dateStart || thisDate > dateEnd)
                    {
                        return;
                    }
                    //console.log(locationSearch.lat);
                    //console.log(parseFloat(markerElem.getAttribute('lat')));
                    if(Math.abs(parseFloat(locationSearch.lat)-parseFloat(markerElem.getAttribute('lat'))) <= 1
                    && Math.abs(parseFloat(locationSearch.lng)-parseFloat(markerElem.getAttribute('lng'))) <= 1){}
                    else{
                        return;
                    }

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
                    allmarkers.push(marker);
                });
                markerCluster = new MarkerClusterer(map, allmarkers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
            });
            setTimeout(function(){ recenter(); }, 200);
        });
    }
}

function verifyDate(dateStart, dateEnd)
{
    if(dateStart < dateEnd)
        return true;
    else
        return false;
}

function trasformYear(year)
{
    var theDate = year.split('/');
    if(theDate[0]<10) {
        theDate[0] = '0'+theDate[0];
    }
    if(theDate[1]<10) {
        theDate[1] = '0'+theDate[1];
    } 
    return Date.parse(theDate[2] + '-' + theDate[1] + '-' + theDate[0]);
}

