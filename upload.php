<?php
namespace Sightengine { 
    require_once 'include/vendor/autoload.php';
    $client = new SightengineClient('84221062', 'YB3w7wnfoRNnMf5qzCwv');//API KEY
    $output = $client->check(['nudity','wad'])->set_file($_FILES['pic']['tmp_name']);
    
   
    // var_dump($output);
    $weapon = $output->weapon;
    $alcohol = $output->alcohol;
    $drugs = $output->drugs;
    $nudity = $output->nudity->safe;
    if($nudity < 0.8) {
        echo "bad";
        return;
    }
    else {
        echo "good";
    }
} 
namespace {
    $pic = $_FILES['pic']['tmp_name'];
    $uploadDir = 'assets/photos'; 
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

    // Opens a connection to a MySQL server
    $db_selected= new mysqli ('localhost', $username, $password,$database);
    if (!$db_selected) {
    	die('Not connected : ' . mysqli_error());
    }
    // Select all the rows in the markers table
    $query = "INSERT INTO gallery (filename, date, lat, lng, author, description) VALUES ('$targetFileName','2018-04-21 00:00:00','1.1','1.1','dfdf','afda')";
    $result = $db_selected->query($query);
    if (!$result) {
    	die('Invalid query: ' . mysqli_error($db_selected));
    }

	$db_selected->close();
}
?>