<?php
    // $destination_path = getcwd().DIRECTORY_SEPARATOR;
    // $destination_path = $destination_path."assets/";
    // $tmp_name = $_FILES["image"]["tmp_name"];
    // move_uploaded_file($tmp_name, $destination_path);
    move_uploaded_file($_FILES["image"]["tmp_name"],"123.txt");
?>