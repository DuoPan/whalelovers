<?php
// do no add any other echo in this file.
namespace Google\Cloud\Vision\V1{
    require_once 'include/vendor/autoload.php';
    putenv('GOOGLE_APPLICATION_CREDENTIALS=./include/FIT5120-458c75cb13b0.json');
    putenv('TMPDIR=./temp'); // fix temp floder premisson when big file.

    $imageAnnotator = new ImageAnnotatorClient();
    $image = file_get_contents($_FILES['pic']['tmp_name']);
    $response = $imageAnnotator->labelDetection($image);
    $labels = $response->getLabelAnnotations();
    $isWhale = false;
    if ($labels) {
        foreach ($labels as $label) {
            // echo ($label->getDescription() . ' ');
            if(strcmp($label->getDescription(), 'whale') == 0
              || strcmp($label->getDescription(), 'whales') == 0
              || strcmp($label->getDescription(), 'dolphins') == 0
              || strcmp($label->getDescription(), 'dolphin') == 0
              || strcmp($label->getDescription(), 'mammal') == 0
              || strcmp($label->getDescription(), 'marine') == 0
              ){
                  $isWhale = true;
                  break;
              }
        }
    } 
    if ($isWhale) {
        echo 'good';
    }
    else {
        echo('bad');
        return;
    }
}

namespace {
    $pic = $_FILES['pic']['tmp_name'];
    $uploadDir = 'assets/photos'; 
    // $uploadDir = "/var/www/html/assets/photos"
    if(!file_exists($uploadDir)){        
        mkdir($uploadDir, 0777);    
    }
    $targetFileName = time() . $_FILES['pic']['name'];
    $targetFile = $uploadDir . '/' . $targetFileName;
    move_uploaded_file($pic, $targetFile) ? true : false;
        
    // echo $pic;echo"**";"/Applications/XAMPP/xamppfiles/temp/php07K54I"
    // echo $targetFileName;echo"**";"1524973354a7.jpg"
    // echo $targetFile;"assets/photos/1524973354a7.jpg"

    require("include/Db_Config.php");
    header("Access-Control-Allow-Origin: *");
    function parseToXML($htmlStr)
    {
    $xmlStr=str_replace('<','&lt;',$htmlStr);
    $xmlStr=str_replace('>','&gt;',$xmlStr);
    $xmlStr=str_replace('"','&quot;',$xmlStr);
    $xmlStr=str_replace("'",'&#39;',$xmlStr);
    $xmlStr=str_replace("&",'&amp;',$xmlStr);
    return $xmlStr;
    }

    $db_selected= new mysqli ('localhost', $username, $password,$database);
    if (!$db_selected) {
    	die('Not connected : ' . mysqli_error());
    }

    $dt = date("Y-m-d H:i:s");
    $author = $_POST['author'];
    $des = $_POST['des'];
    $lat = $_POST['lat'];
    $lng = $_POST['lng'];
    $query = "INSERT INTO gallery (filename, date, lat, lng, author, description) VALUES ('$targetFileName','$dt','$lat','$lng','$author','$des')";
    $result = $db_selected->query($query);
    if (!$result) {
    	die('Invalid query: ' . mysqli_error($db_selected));
    }

    // insert in to display
    $dt2 = date("d/m/Y");
    $name = $_POST['species'];
    if($name == 'Other') {
        $name = 'other';
    }
    $query2 = "INSERT INTO spot_display (name, lat, lon, year, city) VALUES ('$name','$lat','$lng','$dt2','$targetFileName')";
    $result2 = $db_selected->query($query2);
    if (!$result2) {
    	die('Invalid query: ' . mysqli_error($db_selected));
    }



	$db_selected->close();
}
?>