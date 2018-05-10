var countImages = 0;
var countPages = 0;
var page = document.getElementById('currPage');
page.innerHTML = 1;

loadFromDB('./DB_Gallery_Count.php','All', function(data) {
	var xml = data.responseXML;
	var markers = xml.documentElement.getElementsByTagName('marker');
	countImages = parseInt(markers[0].getAttribute('total'));
	countPages = Math.ceil(countImages/6);
	document.getElementById('navtotal').innerHTML = countPages;
});

displayPage(1,'All');

function loadFromDB(url, type, callback) {
    var request = window.ActiveXObject ?
      new ActiveXObject('Microsoft.XMLHTTP') :
      new XMLHttpRequest;
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
      request.onreadystatechange = function(){};
      callback(request, request.status);
      }
    };
    request.open('GET', url+"?type="+type, true);
    request.send(null);
}

function loadFromDBOnePara(url, page, type, callback) {
  var request = window.ActiveXObject ?
    new ActiveXObject('Microsoft.XMLHTTP') :
    new XMLHttpRequest;
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
    request.onreadystatechange = function(){};
    callback(request, request.status);
    }
  };
  request.open('GET', url+"?page="+page+"&type="+type, true);
  request.send(null);
}

function displayPage(pageNum, type) {
  loadFromDBOnePara('./DB_Gallery.php', pageNum, type, function(data) {
    var xml = data.responseXML;
    var markers = xml.documentElement.getElementsByTagName('marker');
    var mainDiv = document.getElementById('putpics');
    Array.prototype.forEach.call(markers, function(markerElem) {
      var filename = markerElem.getAttribute('filename');
      var div1 = document.createElement('div');
      div1.style.width = '100%';
      // div1.style.border = '3px solid grey';
      div1.style.border = '1px solid white';
      var img = document.createElement('img');
      img.src = "assets/photos/"+filename;
      img.style.width = '100%';
      mainDiv.appendChild(div1);
      div1.appendChild(img);

      // handle map
      div1.addEventListener("click", function(){
        showGallerySpot(filename);
      })
    });
  });
}

function nextPage() {
	if (parseInt(document.getElementById('currPage').innerHTML) === countPages) {
		return;		
	}
	page.innerHTML = parseInt(page.innerHTML) + 1;
	var mainDiv = document.getElementById('putpics');
	while (mainDiv.firstChild) {
			mainDiv.removeChild(mainDiv.firstChild);
	}
	displayPage(parseInt(page.innerHTML),document.getElementById('search-select-name').value);
}

function previousPage() {
	if (parseInt(document.getElementById('currPage').innerHTML) === 1) {
		return;		
	}
	page.innerHTML = parseInt(page.innerHTML) - 1;
	var mainDiv = document.getElementById('putpics');
	while (mainDiv.firstChild) {
			mainDiv.removeChild(mainDiv.firstChild);
	}
	displayPage(parseInt(page.innerHTML),document.getElementById('search-select-name').value);
}

function addPost() {
  document.getElementById("uploadBtn").disabled = false;
  document.getElementById("tishi").innerHTML = "";
  document.getElementById("author").value = "";
  document.getElementById("des").value = "";
  $('#uploadModal').modal('show');
  document.getElementById("pic").value = "";  
  document.getElementById("imgPreview").src = "";
  document.querySelector("#progress .progress-item").style.width = 0+"%";
  var width1 = $(".modal-dialog").width()-40;
  var width2 = $("#uploadModal").width()-40;
  var width = width1 < 0 ? width2 : width1;
  document.getElementById('imgPreview').style.maxWidth = width+"px";

  // do map
  resizeMap();
}

function upload(){
  if (document.getElementById('author').value===""){
    document.getElementById('author').style.borderColor = 'red';
    return;
  }
  document.getElementById('author').style.borderColor = '';
  if (document.getElementById('des').value===""){
    document.getElementById('des').style.borderColor = 'red';
    return;
  }
  document.getElementById('des').style.borderColor = '';
  var url="upload.php";
  var pic = document.getElementById('pic').files[0];
  if(pic===undefined){
    return;
  }
  if(postmapMarker.position === undefined) {
    return;
  }
  document.getElementById("tishi").innerHTML = "Checking Content ...";
  var xhr = new XMLHttpRequest();
  var form = new FormData();
  form.append("pic", pic);
  form.append("author",document.getElementById('author').value);
  form.append("des",document.getElementById('des').value);
  form.append("lat", postmapMarker.position.lat());
  form.append("lng", postmapMarker.position.lng());
  form.append("species",document.getElementById('select-species').value);
  xhr.open("POST", url, true);
  xhr.onload = function(){
    if (xhr.status === 200) {
      document.getElementById("uploadBtn").disabled = true;
      // console.log(xhr.responseText);
      if(xhr.responseText === "good")
        document.getElementById("tishi").innerHTML = "Upload Successfully.";
      else 
        document.getElementById("tishi").innerHTML = "There seems no whales in this photo, upload failed.";
    }
  }
  xhr.upload.onprogress = function (event) {
    if (document.getElementById("pic").value === "") return;
    if (event.lengthComputable) {
      var complete = (event.loaded / event.total * 100);
      document.querySelector("#progress .progress-item").style.width = complete+"%";
    }
  };
  xhr.onloadend = function() {
    // var x = document.getElementById("uploadResult");
    // x.classList.remove("hidden");
  }
  xhr.onerror = function() {
  }
  xhr.send(form);
}

function preview(){  
  var fileEle=document.getElementById("pic");  
  var file=fileEle.files[0];  
  var reader = new FileReader();  
  reader.onload = function(e) {  
      var img=document.getElementById("imgPreview");  
      img.src=e.target.result  
  };  
  reader.readAsDataURL(file)  
}  

$("#pic").change(function(){
  //document.getElementById("uploadResult").classList.add("hidden");
  document.getElementById("tishi").innerHTML = "";
  var pic = document.getElementById('pic').files[0];
  if(pic===undefined){
    document.getElementById("imgPreview").src = "";
    document.querySelector("#progress .progress-item").style.width = 0+"%";
    return;
  }
  document.getElementById("uploadBtn").disabled = false;
  preview();
});

function whaleChange() {
  var whaleType = document.getElementById('search-select-name').value;
  changeTotalPage(whaleType);
  changeSidebar(whaleType);
  changeMap(whaleType);
}
function changeTotalPage(whaleType) {
  loadFromDB('./DB_Gallery_Count.php',whaleType, function(data) {
    var xml = data.responseXML;
    var markers = xml.documentElement.getElementsByTagName('marker');
    countImages = parseInt(markers[0].getAttribute('total'));
    countPages = Math.ceil(countImages/6);
    document.getElementById('navtotal').innerHTML = countPages;
    if(countPages === 0) {
      document.getElementById('currPage').innerHTML = 0;
    }else{
      document.getElementById('currPage').innerHTML = 1;
    }
  });
}

function changeSidebar(whaleType) {
	var mainDiv = document.getElementById('putpics');
	while (mainDiv.firstChild) {
			mainDiv.removeChild(mainDiv.firstChild);
	}
	displayPage(1,document.getElementById('search-select-name').value);

}

