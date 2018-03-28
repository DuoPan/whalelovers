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
      min-height: 500px;
      overflow: hidden;
      width: 100%;
      background-color: white;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      margin-bottom: 25px;
    }

    div.container2 {
      text-align: center;
      padding: 10px 20px;
    }
    <!-- Style for line -->
    #grad1 {
      padding-top:5xp;
        height: 1px;
        background: white; /* For browsers that do not support gradients */
        background: linear-gradient(to right,white,blue,blue,blue,blue,blue,white);
        /* Standard syntax (must be last) */
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
            var hb1 = [
		['Humpback whale','Humpback whales are one of the most common species of whale you will see in Australian waters and are well known for their spectacular breaching behaviour. They have very long pectoral fins and obvious throat grooves. Humpback whales also have a small dorsal fin located nearly two-thirds of the way down their back, and their backs steeply arch as they dive – this is how the humpback got its name and it helps whale watchers distinguish them from other species.'],
		['Common dolphin','Common Dolphins are slender, with a long beak protruding sharply from the head. The dorsal fin is high and curves backwards.'],
		['Australian hump','Australian humpback dolphins are usually grey with various white scarring and dark flecking in some areas. They have a robust and medium sized body with a short, slightly recurved and triangular-shaped dorsal fin.'],
		['Australian snub','The Australian snubfin dolphin is characterised by a broadly rounded head that is extremely mobile and usually has a visible neck crease. There is no sign of a beak and the mouth line is straight. The colour pattern for Australian snubfin dolphins is characteristic, with a subtle three-tone consisting of a dark cape, white abdomen and intermediate light grey to brownish grey side.'],
		['Blue whale','Blue whales are the largest animal on earth with an average length of 24 meters and a weight of up to 136 tonnes. Blue whales have grey blue skin with white spots and a small dorsal fin set far back on their body.'],
		['Common bottleno','The common bottlenose dolphin is grey in colour and grows to between 2 and 4 meters long. It has a short rounded snout, described as bottle-shaped. The large dorsal fin is slightly hooked and set half way along the body.'],
		['Dwarf minke wha','The dwarf minke whale is the smallest baleen (filter feeding) whale, reaching less than 8m long. The nose of the dwarf minke whale is very narrow and pointed and it has a dark grey back and ivory white underside. The side colouration is more complex, with three dark grey fields descending from the back, white blazes ascending from the belly and a series of light grey patches, saddles and streaks.'],
		['Killer whale','Killer whales are the largest member of the dolphin family and are recognisable by their distinctive black, white and grey colouration. The head is rounded, they have a white eye patch, or spot located just above and behind the eye and a grey saddle patch behind the dorsal fin. The killer whale\'s belly, lower jaw and the underside of the tail flukes are white and the rest of the body is black.'],
		['Southern right','The southern right whale is a large whale that is easily distinguished from others because of its broad back without a dorsal fin, wide pectoral fins, a long arching mouth that begins above the eye and small rough patches of skin (or callosities) on its head.'],
		['Spinner dolphin','The spinner dolphin is a slender dolphin with an extremely long, thin beak. The dorsal fin ranges from slightly sickle-shaped to being erect and triangular, with males primarily exhibiting the latter shape on maturity. Spinner dolphins have a dark coloured cape extending to approximately halfway along the tail stock; light grey sides; and a white belly. The upper beak is dark in colour, while the lower jaw is white with a dark tip']];
		
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
                heading.textContent = name;
                infowincontent.appendChild(heading);
                infowincontent.appendChild(document.createElement('br'));
                var text = document.createElement('text');
                infowincontent.appendChild(text);  
                  
                var marker = new google.maps.Marker({position: point,icon: './assets/images/whale.png'}); 	
                google.maps.event.addListener(marker, 'click', function(evt) {
                  //Sample Click Event
                  infoWindow.setContent(infowincontent);
                  infoWindow.open(map, marker);
                  var defaultDivTag = document.getElementById('defaultFrame');
                  defaultDivTag.style.display = 'none'; //Hiding Default Frame when Marker is selected
                  var divTag = document.getElementById('markerSelectFrame');
                  divTag.style.display = 'block'; //Making Frame Visible when marker is selected
                  var imgSrc = document.getElementById('img_desc');
                  var imgdesc = document.getElementById('pdesc');
                  imgSrc.src = imgLoc+name.trim()+'.png';
                  <!-- Loop is used to get the description using with whale name
                  for(var i=0;i < hb1.length;i=i+1){
                    if(hb1[i][0] == name.trim()){
                      imgdesc.innerHTML = hb1[i][1]; 
                    }
                  }
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
        <!-- Container used for displaying small description -->
			
        		<!-- Default Container-->
			<div class="polaroid" id="defaultFrame">
				<img src="./assets/images/whale-icon.gif" alt="Norway" style="width:30%; display:block; margin-left:auto; margin-right:auto; padding-top:50%; padding-bottom:5%;" ></img>
				<p style="text-align: center;padding: 10px 10px; color:black;">Select a pin to see which species under there!</p>
				<div>

        </div>
			<!-- Default Polarid Ends Here-->
			</div>
		
          <div class="polaroid" style="display:none;" id="markerSelectFrame">
        <!-- Image Header -->
			<div style="font-size: 20px; padding:20px 20px 20px 20px; vertical-align:middle;">
				<b>Image</b>
				<br/>
				<div id="grad1"> </div>
			</div>
			<!--Img tag used on click of marker-->
			<img id="img_desc" src="./assets/images/spot_img.png" style="width:100%; padding:20px 20px 20px 20px; display:block;"/>
			<!-- Description Header -->
			<div style="font-size: 20px; padding:20px 20px 20px 20px; vertical-align:middle;">
				<b>Description</b>
				<br/>
				<div id="grad1"></div> 
			</div>
			<!-- Paragraph to display description -->
			<div style="font-size: 5px; padding:10px 20px 0px 20px; vertical-align:middle;">
				<p id="pdesc">A small description</p>
			</div>
			<!-- Link to class -->
			<div style = "text-align:center; width:100%; position: relative; bottom:0; padding: 10px 10px 10px 10px;">
				<a href="./type_page.php"><p>Know more</p></a>
			</div>
		<!-- Container Polaroid ends here -->
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