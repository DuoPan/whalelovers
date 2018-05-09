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
	$query = "SELECT * FROM prediction";
	$result = $db_selected->query($query);
	if (!$result) {
	  die('Invalid query: ' . mysqli_error());
	} 
		$data = array();
		foreach ($result as $row) {
			$data[] = $row;
		}
		
		//now print the data
		print json_encode($data);

?>