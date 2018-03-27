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
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqgZF9VqcM8fgtgwEMu2a_o32KY1GJrRI&callback=initMap"></script>
<style>
    #dp_map {
        height: 600px;
        width: 100%;
    }
    .jumbotron {
        margin-bottom: 0px!important;
    }
</style>

<!-- Google Map API End -->


<title>Spots</title>
</head>

<body>


  <!-- Nav Bar -->
 

<nav class="navbar navbar-custom navbar-fixed-top" role="navigation" style="background-color:#0077be">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
                    <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand" href="index.php">
                    <h1>Whale Lovers</h1>

                </a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse navbar-right navbar-main-collapse">
		      	<ul class="nav navbar-nav">
					<li class="active"><a href="index.php"  style="color:white">Home</a></li>
					<li id="dp_service_menu" class="dropdown">
						<a href="#service" style="color:white" class="dropdown-toggle" data-toggle="dropdown">Services<b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a href="spot_page.php">Spot</a></li>
							<li><a href="type_page.php">Type</a></li>
						</ul>
					</li>
					<li><a href="#about" style="color:white">OurTeam</a></li>
					<li><a href="#contact" style="color:white">Contact</a></li>					
		      	</ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

  <!-- Nav Bar End -->

  
  <!-- Top Pic -->
  <div >
     <img src="./assets/images/bg1.png" class="img-fluid" alt="Responsive image" width="100%" height="200">
  </div>
  <!-- Top Pic End -->
<div class="container">
 

  <!-- Google Map  -->
  <div id="dp_map"></div>
  <!-- Google Map End -->
  <!-- Table -->
  <?php
    $mysqli = new mysqli("localhost", "root", "", "asiadock");
    $result = $mysqli->query("SELECT vernacularName, decimalLatitude, decimalLongitude, year FROM spot_new");
      echo'
      <table id="dp_table"
        data-toggle="table"
        data-striped = "true"
        data-pagination = "true"
        data-page-size = "20"
        data-page-list = [10,20,50,100]
        data-show-columns="true"
        data-search = "true"
        >
        <thead>
          <tr>
          <th data-sortable="true">ID</th>
          <th data-sortable="true">Name</th>
          <th >Latitude</th>
          <th >Longitude</th>
          <th data-sortable="true">Year</th>
          </tr>
        </thead>
        <tbody>
        '; $index=1;while($row = $result->fetch_assoc()){
          echo '
          <tr>
          <td>'; echo $index; echo '</td>
          <td>'; echo $row['vernacularName']; echo '</td>
          <td>'; echo $row['decimalLatitude']; echo '</td>
          <td>'; echo $row['decimalLongitude']; echo '</td>
          <td>'; echo $row['year']; echo '</td>
          </tr>
          ';
          $index++;
        }
           echo '
        </tbody>
      </table>
      ';
  ?>
  <!-- Table End -->
  
</div>

<!-- Footer -->
<div class="jumbotron jumbotron-fluid">
  <a>say something</a>
</div>
<!-- Footer End -->

<script>
  var uluru1 = {lat:-37.020100, lng:144.964600};
  var map = new google.maps.Map(document.getElementById("dp_map"), {
      zoom: 4,
      center: uluru1
  });

  var currMarker=null;
  $(function () {  
    $('#dp_table').on('click-row.bs.table', function (e, row, element)   
    {    
      if(currMarker!=null){
        currMarker.setMap(null);
      }
      var contentString = '<div id="content">'+
            '<h3 id="firstHeading" class="firstHeading">'+row[1]+'</h3>'+
            '<div id="bodyContent">'+
            '<h4>'+row[4]+'</h4>'+
            '</div>'+
            '</div>';
      currMarker = new google.maps.Marker({
        position: {lat:parseFloat(row[2]),lng:parseFloat(row[3])},
        map: map,
        title: row[1]
      });
      var infowindow = new google.maps.InfoWindow({
          content: contentString
      });
      currMarker.addListener('click', function() {
          infowindow.open(map, currMarker);
      });
    });  
}) 
</script>

<!-- Custom Theme JavaScript -->
<script src="assets/dp_homepage/js/jquery.easing.min.js"></script>	
<script src="assets/dp_homepage/js/jquery.scrollTo.js"></script>
<script src="assets/dp_homepage/js/wow.min.js"></script>
<script src="assets/dp_homepage/js/custom.js"></script>

</body>
</html>