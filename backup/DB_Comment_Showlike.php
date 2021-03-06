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
$ip = $_GET['ip'];

$query = "SELECT filename FROM thumbsup WHERE ip = '$ip'";

$result = $db_selected->query($query);
if (!$result) {
  die('Invalid query: ' . mysqli_error());
}

header("Content-type: text/xml");
// $_GET['page'];
// Start XML file, echo parent node
echo "<?xml version='1.0' ?>";
echo '<markers>';
$ind=0;
// Iterate through the rows, printing XML nodes for each
while ($row = @mysqli_fetch_assoc($result)){
  // Add to XML document node
  echo '<marker ';
  echo 'filename="' . parseToXML($row['filename']) . '" ';
  echo '/>';
  $ind = $ind + 1;
}

// End XML file
echo '</markers>';
$db_selected->close();

?>