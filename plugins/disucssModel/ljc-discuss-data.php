<?php
include_once("conn.php");
$htmlName = $_POST['htmlName'];
$sql = "select * from discuss where htmlName='".$htmlName."'";
$result = $mysqli->query($sql);
$num = $result->num_rows;
if($num>0){
    $content = array();
    $i = 0;
    while($row = $result->fetch_array(MYSQLI_ASSOC)){
        $content[$i][0] = $row['content'];
        $content[$i][1] = $row['num'];
        //检索相关层楼的回复数据
        $sqlDisID = "select content from answer where htmlName='".$htmlName."'and discussID='".$row['num']."'";
        $resultDisID = $mysqli->query($sqlDisID);
        while($rowDisID = $resultDisID->fetch_array(MYSQLI_ASSOC)){
            $content[$i][2][] = $rowDisID['content'];
        }
        $i++;
    }
    $jsonData = json_encode($content);
    echo $jsonData;
}else{
    echo "0";
}
