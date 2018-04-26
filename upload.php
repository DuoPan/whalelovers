<?php
    $pic = $_FILES['pic']['tmp_name'];
    if($pic){
        $uploadDir = 'assets/photos'; 
        if(!file_exists($uploadDir)){        
            mkdir($uploadDir, 0777);    
        }    
        $targetFile = $uploadDir . '/' . time() . $_FILES['pic']['name'];
        move_uploaded_file($pic, $targetFile) ? true : false;
    }
?>