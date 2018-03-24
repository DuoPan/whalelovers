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
  <nav class="navbar navbar-light navbar-fixed-top" style="background-color: #e3f2fd;">
  <a class="navbar-brand" href="index.php">Whale Lovers</a>
  <ul class="nav navbar-nav">
    <li class="nav-item">
      <a class="nav-link" href="index.php">Home</a>
    </li>
    <li class="nav-item active">
      <a class="nav-link" href="spot_page.php">Spots</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="type_page.php">Types</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">About</a>
    </li>
  </ul>
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
    $result = $mysqli->query("SELECT name, lat, lon, year FROM spot");
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
          <td>'; echo $row['name']; echo '</td>
          <td>'; echo $row['lat']; echo '</td>
          <td>'; echo $row['lon']; echo '</td>
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
</body>
</html>