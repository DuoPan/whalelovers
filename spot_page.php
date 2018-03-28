<!DOCTYPE html>
<html>
<head>

<!-- Bootstrap -->
<link rel="stylesheet" href="./assets/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="./assets/bootstrap-table/src/bootstrap-table.css">
<script src="./assets/jquery.min.js"></script>
<script src="./assets/bootstrap/js/bootstrap.min.js"></script>
<script src="./assets/bootstrap-table/src/bootstrap-table.js"></script>
<!-- Bootstrap  End -->

<!-- Fonts -->
<link href="assets/dp_homepage/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="assets/dp_homepage/css/animate.css" rel="stylesheet" />
<!-- Squad theme CSS -->
<link href="assets/dp_homepage/css/style.css" rel="stylesheet">
<link href="assets/dp_homepage/color/default.css" rel="stylesheet">

<!-- Google Map API -->
<style>
    #dp_map {
    }
    .jumbotron {
        margin-bottom: 0px!important;
    }
    div.polaroid {
      width: 100%;
      height: 500px;
      background-color: white;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      margin-bottom: 25px;
    }

    div.container2 {
      text-align: center;
      padding: 10px 20px;
    }
</style>
<script type="text/javascript" src="./src/markerclusterer.js"></script>
<script type="text/javascript" src="./src/data.json"></script>

<!-- Google Map API End -->


<title>Spots</title>
</head>

<body style="padding-top: 120px">


  <!-- Nav Bar -->
 

<nav class="navbar navbar-custom navbar-fixed-top" role="navigation" style="background-color:#0077be">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
                    <i class="fa fa-bars"></i>
                </button>
                <img class="navbar-left" src="assets/images/logo_white.png" height="50px"></img>
                <a class="navbar-brand">
                <h1>WhaleLovers</h1>
                </a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse navbar-right navbar-main-collapse">
		      	<ul class="nav navbar-nav">
              <li><a href="index.php" style="color:white;">Home</a></li>
              <li><a href="index.php#service" style="color:white">Services</a></li>
              <li class="active"><a href="#" style="color:white;">Spot</a></li>
              <li><a href="type_page.php" style="color:white;">Class</a></li>					
		      	</ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

  <!-- Nav Bar End -->

  
  <!-- Top Pic -->

  <!-- Top Pic End -->

<div class="container">
 
      <!-- Google Map  -->
      <div class="row">
        <div id="map" class="col-md-8"></div>
        <script>
            var customLabel = {
            restaurant: {
              label: 'R'
            },
            bar: {
              label: 'B'
            }
            };
            function initMap() {
            var map = new google.maps.Map(document.getElementById('map'), {
              center: new google.maps.LatLng(-25.2744, 133.7751),
              zoom: 4,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
         //     scrollwheel: false
            });
            
            var imgLoc = './assets/images/smallDesc/'
            var allmarkers = [];
            var infoWindow = new google.maps.InfoWindow;
              //Reading Php File
              downloadUrl('./Db_Connect.php', function(data) {
                var xml = data.responseXML;
                var markers = xml.documentElement.getElementsByTagName('marker');
                Array.prototype.forEach.call(markers, function(markerElem) {
                var name = markerElem.getAttribute('name');
                var year = markerElem.getAttribute('year');
                var point = new google.maps.LatLng(
                  parseFloat(markerElem.getAttribute('lat')),
                  parseFloat(markerElem.getAttribute('lng')));
                  
                var infowincontent = document.createElement('div');
                var heading = document.createElement('strong');
                heading.textContent = name
                  infowincontent.appendChild(heading);
                  infowincontent.appendChild(document.createElement('br'));
                  

                  var text = document.createElement('text');
                  infowincontent.appendChild(text);  
                  
                var marker = new google.maps.Marker({position: point,icon: './assets/images/whale.png'}); 	
                google.maps.event.addListener(marker, 'click', function(evt) {
                //Sample Click Event
                  infoWindow.setContent(infowincontent);
                  infoWindow.open(map, marker);
                  var imgSrc = document.getElementById('img_desc');
                  imgSrc.src = imgLoc+name+'.png';
                });
                allmarkers.push(marker);
                
                });
                var markerCluster = new MarkerClusterer(map,allmarkers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
              });
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
        </script>
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqgZF9VqcM8fgtgwEMu2a_o32KY1GJrRI&callback=initMap"></script>
    
        <div class="col-md-4">
          <div class="polaroid">
            <img id="img_desc" style="width:100%; padding: 25px 50px 75px 100px;"/>
            <div class="container2">
            <p>A small description</p>
            </div>
            <div class="container2">
            <p>know more</p>
            </div>
          </div>
            </div>
        </div>

      </div>
    <!-- Google Map End -->
 


</div>

  <!-- Footer -->

	<footer style="bottom:0px;">
		<div class="container">
			<div class="row">
				<div class="col-md-12 col-lg-12">
					<div class="wow shake" data-wow-delay="0.4s">
					
					</div>
					<p>&copy;Copyright 2018 - Asiadock. All rights reserved. </p>
				</div>
			</div>	
		</div>
	</footer>
<!-- Footer End -->

<!-- Custom Theme JavaScript -->
<script src="assets/dp_homepage/js/jquery.easing.min.js"></script>	
<script src="assets/dp_homepage/js/jquery.scrollTo.js"></script>
<script src="assets/dp_homepage/js/wow.min.js"></script>
<script src="assets/dp_homepage/js/custom.js"></script>

</body>
</html>