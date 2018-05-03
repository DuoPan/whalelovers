var page = document.getElementById('currPage');
page.innerHTML = 1;
var filenames = [];

var lng = 0;
var lat = 0;
var ip;
getLocation();
getIP();

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
          var mainDiv = document.getElementById('putpics');
          var div1 = document.createElement('div');
          div1.classList.add("col-sm-6");
          div1.classList.add("col-md-4");
          var div2 = document.createElement('div');
          div2.style.height = '400px';
          div2.classList.add("thumbnail");
          div2.style.display = "flex";
          div2.style.flexDirection = "column";
          div2.style.justifyContent = "space-between";
          var div3 = document.createElement('a');
          div3.classList.add("lightbox");
          div3.href="assets/photos/"+filename;
          var div4 = document.createElement('img');
          div4.src = "assets/photos/"+filename;
          var div5 = document.createElement('div');
          div5.classList.add("caption");
          var h3 = document.createElement('h3');
          h3.innerHTML = markerElem.getAttribute('author');
          var p = document.createElement('p');
          p.innerHTML = markerElem.getAttribute('description');
          var like = document.createElement('span');
          like.classList.add("glyphicon");
          like.classList.add("glyphicon-heart-empty");
          like.style.fontSize = '25px';
          like.style.float = 'right';
          like.style.color = 'grey';
          like.addEventListener('click', function(event) {
            clickLike(event.target,div4);
          });
          var comment = document.createElement('span');
          comment.classList.add("glyphicon");
          comment.classList.add("glyphicon-comment");
          comment.style.fontSize = '25px';
          comment.style.float = 'right';
          comment.style.color = 'grey';
          comment.style.marginRight = '5px';
          comment.addEventListener('click', function(event) {
            clickComment(div4);
          });
          mainDiv.appendChild(div1);
          div1.appendChild(div2);
          div2.appendChild(div3);
          div3.appendChild(div4);
          div2.appendChild(div5);
          div5.appendChild(h3);
          div5.appendChild(p);
          div5.appendChild(like);
          div5.appendChild(comment);
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
  document.getElementById("tishi").innerHTML = "Checking Content ...";
  var xhr = new XMLHttpRequest();
  var form = new FormData();
  form.append("pic", pic);
  form.append("author",document.getElementById('author').value);
  form.append("des",document.getElementById('des').value);
  form.append("lat", lat !== 0 ? lat : 0);
  form.append("lng", lng !== 0 ? lng : 0); 
  xhr.open("POST", url, true);
  xhr.onload = function(){
    if (xhr.status === 200) {
      document.getElementById("uploadBtn").disabled = true;
      // console.log(xhr.responseText);
      if(xhr.responseText === "good")
        document.getElementById("tishi").innerHTML = "Upload Successfully.";
      else 
        document.getElementById("tishi").innerHTML = "This photo may contains sensitive contents, upload failed.";
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

function clearUpload() {
  document.getElementById("uploadBtn").disabled = false;
  document.getElementById("tishi").innerHTML = "";
  document.getElementById("author").value = "";
  document.getElementById("des").value = "";
  $('#uploadModal').modal('show');
  document.getElementById("pic").value = "";  
  document.getElementById("imgPreview").src = "";
  document.querySelector("#progress .progress-item").style.width = 0+"%";
  //document.getElementById("uploadResult").classList.add("hidden");
  
  var width1 = $(".modal-dialog").width()-40;
  var width2 = $("#uploadModal").width()-40;
  //console.log(width1);console.log(width2);
  var width = width1 < 0 ? width2 : width1;
  document.getElementById('imgPreview').style.maxWidth = width+"px";

}

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  } else {
  }
}

function getIP()
{
  $.get("http://ipinfo.io", function(response) {
    ip = response.ip;
  }, "jsonp");
}


function showPosition(position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude; 
}

function clickLike(it,theImg) {
  var temp = theImg.src.split('/');
  var likeName = temp[temp.length-1];
  if(it.style.color === 'grey')
  {
    it.style.color = 'red';
    it.classList.remove('glyphicon-heart-empty');
    it.classList.add('glyphicon-heart');
    postLikeData('DB_Comment_Like.php',ip, likeName,function(data) {});
  }else{
    it.style.color = 'grey';
    it.classList.remove('glyphicon-heart');
    it.classList.add('glyphicon-heart-empty');
    postDislikeData('DB_Comment_Dislike.php',ip, likeName,function(data) {});
  }              
}

var imgName = "";
function clickComment(theImg) {
  var x = document.getElementById("commentArea");
  var temp = theImg.src.split('/');
  imgName = temp[temp.length-1];
    if (x.style.display === "table-cell") {
       x.style.display = "none";
       clickComment(theImg);
    } 
    else {
        x.style.display = "table-cell";
        document.getElementById("comImg").src=theImg.src;
        clearComments();
        loadCommentData('./DB_Comment.php', imgName, function(data) {
          var xml = data.responseXML;
          var markers = xml.documentElement.getElementsByTagName('marker');
          var mainDiv = document.getElementById("comHistory");
          Array.prototype.forEach.call(markers, function(marker) {
            var aPairDiv = document.createElement('div');
            aPairDiv.innerHTML = marker.getAttribute('name') + ": " + marker.getAttribute('message');
            mainDiv.appendChild(aPairDiv)
          });
        });
    }
}

function loadCommentData(url, imgName, callback) {
  var request = window.ActiveXObject ?
    new ActiveXObject('Microsoft.XMLHTTP') :
    new XMLHttpRequest;
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };
  request.open('GET', url+"?imgName="+imgName, true);
  request.send(null);
};

function clearComments() {
  var mainDiv = document.getElementById("comHistory");
  while (mainDiv.firstChild) {
    mainDiv.removeChild(mainDiv.firstChild);
  }
  document.getElementById("commentDetail").style.borderColor='';
  document.getElementById("commentDetail").value='';
  document.getElementById("commentName").value='';
}

function postComment() {
  var name = document.getElementById("commentName").value;
  var message = document.getElementById("commentDetail").value;
  if (name === "") {
    name = "Anonymous";
  }
  if (message === ""){
    document.getElementById("commentDetail").style.borderColor='red';
    return;
  }
  postCommentData('./DB_Comment_Post.php', imgName, name, message, function(data) {
    var mainDiv = document.getElementById("comHistory");
    var aPairDiv = document.createElement('div');
    aPairDiv.innerHTML = name + ": " + message;
    mainDiv.appendChild(aPairDiv)
    document.getElementById("commentName").value="";
    document.getElementById("commentDetail").value="";
    document.getElementById("commentDetail").style.borderColor="";
  });
}

function postCommentData(url, imgName, name, message, callback) {
  var request = window.ActiveXObject ?
    new ActiveXObject('Microsoft.XMLHTTP') :
    new XMLHttpRequest;
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };
  request.open('GET', url+"?imgName="+imgName+"&name="+name+"&message="+message, true);
  request.send(null);
};

function cancelComment() {
  document.getElementById("commentArea").style.display="none";
}

function postLikeData(url, ip, imgName, callback) {
  var request = window.ActiveXObject ?
    new ActiveXObject('Microsoft.XMLHTTP') :
    new XMLHttpRequest;
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };
  request.open('GET', url+"?imgName="+imgName+"&ip="+ip, true);
  request.send(null);
}

function postDislikeData(url, ip, imgName, callback) {
  var request = window.ActiveXObject ?
    new ActiveXObject('Microsoft.XMLHTTP') :
    new XMLHttpRequest;
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };
  request.open('GET', url+"?imgName="+imgName+"&ip="+ip, true);
  request.send(null);
}