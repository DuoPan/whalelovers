<?php
require("../include/Db_Config.php");
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
$ip = $_GET['ip'];

$query = "INSERT INTO thumbsup (ip, filename) VALUES ('$ip','$imgName')";
$result = $db_selected->query($query);
if (!$result) {
  die('Invalid query: ' . mysqli_error());
}
$db_selected->close();

?>