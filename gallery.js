var page = document.getElementById('currPage');
page.innerHTML = 1;
var filenames = [];

displayPage(1);
var countImages = 0;
var countPages = 0;
loadTotalNum('./DB_Gallery_Count.php', function(data) {
	var xml = data.responseXML;
	var markers = xml.documentElement.getElementsByTagName('marker');
	countImages = parseInt(markers[0].getAttribute('total'));
	document.getElementById('destotal').innerHTML = countImages;
	countPages = Math.ceil(countImages/12)
	document.getElementById('navtotal').innerHTML = countPages;
	document.getElementById('navtotal2').innerHTML = countPages;
});

function loadImages(url, page, callback) {
    var request = window.ActiveXObject ?
      new ActiveXObject('Microsoft.XMLHTTP') :
      new XMLHttpRequest;
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
      }
    };
    request.open('GET', url+"?page="+page, true);
    request.send(null);
}

function loadTotalNum(url, callback) {
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

function doNothing() {}

function displayPage(pageNum) {
    filenames = [];
    loadImages('./DB_Gallery.php', pageNum, function(data) {
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName('marker');
        Array.prototype.forEach.call(markers, function(markerElem) {
          var filename = markerElem.getAttribute('filename');
          filenames.push(filename);
        });
        filenames.forEach(function(file){
            var mainDiv = document.getElementById('putpics');
            var div1 = document.createElement('div');
            div1.classList.add("col-sm-6");
            div1.classList.add("col-md-4");
            var div2 = document.createElement('div');
            div2.classList.add("thumbnail");
            var div3 = document.createElement('a');
            div3.classList.add("lightbox");
            div3.href="assets/photos/"+file;
            var div4 = document.createElement('img');
            div4.src = "assets/photos/"+file;
            var div5 = document.createElement('div');
            div5.classList.add("caption");
            var h3 = document.createElement('h3');
            h3.innerHTML = "Thumbnail label";
            var p = document.createElement('p');
            p.innerHTML = "Thumbnail orem ipsum dolor sit amet, consectetur adipisicing elit, sed";
            mainDiv.appendChild(div1);
            div1.appendChild(div2);
            div2.appendChild(div3);
            div3.appendChild(div4);
            div2.appendChild(div5);
            div5.appendChild(h3);
            div5.appendChild(p);
        });
        baguetteBox.run('.tz-gallery');
    });
}

function nextPage() {
	if (parseInt(document.getElementById('currPage').innerHTML) === countPages) {
		return;		
	}
	page.innerHTML = parseInt(page.innerHTML) + 1;
	document.getElementById('currPage2').innerHTML =	page.innerHTML;
	var mainDiv = document.getElementById('putpics');
	while (mainDiv.firstChild) {
			mainDiv.removeChild(mainDiv.firstChild);
	}
	displayPage(parseInt(page.innerHTML));
}

function previousPage() {
	if (parseInt(document.getElementById('currPage').innerHTML) === 1) {
		return;		
	}
	page.innerHTML = parseInt(page.innerHTML) - 1;
	document.getElementById('currPage2').innerHTML =	page.innerHTML;
	var mainDiv = document.getElementById('putpics');
	while (mainDiv.firstChild) {
			mainDiv.removeChild(mainDiv.firstChild);
	}
	displayPage(parseInt(page.innerHTML));
}