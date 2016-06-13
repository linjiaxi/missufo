<?php
include_once("conn.php");
$content = $_POST['content'];
$discussID = $_POST['discussID'];
$htmlName = $_POST['htmlName'];
$sql = "insert into answer(content,discussID,htmlName) VALUES ('".$content."','".$discussID."','$htmlName"."')";
$result = $mysqli->query($sql);
$num = $mysqli->affected_rows;
if($num == 1){
    echo $num;
}

?>
