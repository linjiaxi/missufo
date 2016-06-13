<?php
$mysqli = new mysqli("数据库地址",'数据库用户名','数据库密码','数据库');
if(!$mysqli->errno == 0) echo $mysqli->errno;
?>