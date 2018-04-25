<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Bootstrap -->
<link rel="stylesheet" href="./assets/bootstrap/css/bootstrap.min.css">
<script src="./assets/jquery.min.js"></script>
<script src="./assets/bootstrap/js/bootstrap.min.js"></script>
<!-- Bootstrap  End -->

<!-- Fonts -->
<link href="assets/dp_homepage/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="assets/dp_homepage/css/animate.css" rel="stylesheet" />
<!-- Squad theme CSS -->
<link href="assets/dp_homepage/css/style.css" rel="stylesheet">
<link href="assets/dp_homepage/color/default.css" rel="stylesheet">

<link rel="stylesheet" href="./assets/gallery/baguetteBox.min.css">
<link rel="stylesheet" href="./assets/gallery/thumbnail-gallery.css">
<link rel="stylesheet" href="./assets/gallery/gallery.css">
<style>

</style>
<title>Post</title>
<link rel="shortcut icon" href="assets/images/whale.png" />
</head>

<body style="padding-top: 80px">

	<!-- Nav Bar -->
  <nav class="navbar navbar-custom navbar-fixed-top top-nav-collapse" role="navigation" style="background-color:#0077be">
    <div class="container">
      <div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
		  		<i class="fa fa-bars"></i>
				</button>
        		<img style="display:inline;" class="navbar-left" src="assets/images/logo_white.png" height="50px"></img>
				<a class="navbar-brand">
					<h1>WhaleLovers</h1>
				</a>
    	</div>
			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse navbar-right navbar-main-collapse">
				<ul class="nav navbar-nav">
					<li><a href="index.html"  style="color:white">Home</a></li>
					<li><a href="index.html#service" style="color:white">Service</a></li>
					<li><a href="spot_page.html" style="color:white">Spot</a></li>
					<li><a href="type_page.html" style="color:white">Classification</a></li>	
					<li><a href="safety.html" style="color:white">Safety</a></li>	
					<li class="active"><a href="" style="color:white">Gallery</a></li>					
				</ul>
			</div>
			<!-- /.navbar-collapse -->
		</div>
    <!-- /.container -->
  </nav>
  <!-- Nav Bar End -->
  <?php 
	$folder = dirname('./assets/photos/*');
	$files = array();
	$handle = opendir($folder);
	while(false!==($file=readdir($handle))){
		if($file!='.' && $file!='..' && $file!='.DS_Store'){
			$files[] = $file;
		}
    }
   
  ?>
  
	<div class="container">
		<!-- link nav bar -->
		<div>
			<p><a href="index.html">Home</a> -> Posts</p>
		</div>
		<!-- link nav bar  end-->
		<div class="page-header">
			<h3 class="page-title">Gallery</h3>
			<h3 class="page-subtitle">1 - 12 of 1713 photos</h3>
			<div class="page-options">
				<select class="form-control custom-select">
					<option value="asc">Newest</option>
					<option value="desc">Oldest</option>
				</select>
			</div>
			<form method="POST" action="save.php" enctype="multipart/form-data">
				<button class="btn btn-light" type="submit">Upload</button>
				<div>
				<input type="file" data-clear-btn="false" name="image" accept="image/*" capture>
				</div>
			</form>
		</div>

        
        <div class="tz-gallery">
            <div class="row">
                <?php 
                    $page=0;
                    for($i = 0; $i < 12; $i+=1) {
                        if($i+$page*12>=count($files)){
                            echo 'meiyou';
                        }
                        else {
                            echo '<div class="col-sm-6 col-md-4">';
                            echo '<div class="thumbnail">';
                            echo '<a class="lightbox" href="./assets/photos/';echo $files[$i+$page*12];echo '">';
                            echo '<img src="assets/photos/';echo $files[$i+$page*12];echo '">';
                            echo '</a>';
                            echo '<div class="caption">';
                            echo '<h3>Thumbnail label</h3>';
                            echo '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>';
                            echo '</div>';
                            echo '</div>';
                            echo '</div>';
                        }
                    }
                ?>
            </div>
        </div>

   
    </div><!-- container -->

    <!-- Footer -->

	<footer>
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
<script type="text/javascript" src="./assets/gallery/baguetteBox.min.js"></script>
<script type="text/javascript">
	baguetteBox.run('.tz-gallery');

</script>
</body>

</html>