<?php
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
$imgName = $_GET['imgName'];
$name = $_GET['name'];
$message = $_GET['message'];

$query1 = "SELECT count(*) as total FROM comment";
$result1 = $db_selected->query($query1);
if (!$result1) {
  die('Invalid query: ' . mysqli_error());
}
$row = @mysqli_fetch_assoc($result1);
$id=$row['total'];


$query = "INSERT INTO comment (filename, id, message, name) VALUES ('$imgName','$id','$name','$message')";
$result = $db_selected->query($query);
if (!$result) {
  die('Invalid query: ' . mysqli_error());
}
$db_selected->close();

?>