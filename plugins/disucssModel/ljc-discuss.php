<?php
include_once("conn.php");
//$mysqli = new mysqli('localhost','root','439928','blog');
$content = $_POST['textAreaContent'];
$htmlName = $_POST['htmlName'];
$number = $_POST['num'];
$sql = "insert into discuss(content,htmlName,num) VALUES ('".$content."','".$htmlName."','".$number."')";
$result = $mysqli->query($sql);
$num = $mysqli->affected_rows;
if($num == 1){
    echo $num;
}

?>
