<?php 
require 'linkDB.php';
$sTitle=$_GET['sTitle'];
$rNum=$_GET['rNum'];
$query0=mysql_query("select * from video0 where title='{$sTitle}' and series='{$rNum}'") or die('SQL错误!');
while(!!$row=mysql_fetch_array($query0,MYSQL_ASSOC)){
		$json0.=json_encode($row).',';
		// print_r($row);
		// echo $row[id];
		
	}
$query1=mysql_query("select * from video1 where title='{$sTitle}' and series='{$rNum}'") or die('SQL错误!');
while(!!$row=mysql_fetch_array($query1,MYSQL_ASSOC)){
		$json1.=json_encode($row).',';
		// print_r($row);
		// echo $row[id];
		
	}
$query2=mysql_query("select * from video2 where title='{$sTitle}' and series='{$rNum}'") or die('SQL错误!');
while(!!$row=mysql_fetch_array($query2,MYSQL_ASSOC)){
		$json2.=json_encode($row).',';
		// print_r($row);
		// echo $row[id];
		
	}
$query3=mysql_query("select * from video3 where title='{$sTitle}' and series='{$rNum}'") or die('SQL错误!');
while(!!$row=mysql_fetch_array($query3,MYSQL_ASSOC)){
		$json3.=json_encode($row).',';
		// print_r($row);
		// echo $row[id];
		
	}
$query4=mysql_query("select * from video4 where title='{$sTitle}' and series='{$rNum}'") or die('SQL错误!');
while(!!$row=mysql_fetch_array($query4,MYSQL_ASSOC)){
		$json4.=json_encode($row).',';
		// print_r($row);
		// echo $row[id];
		
	}
$query5=mysql_query("select * from video5 where title='{$sTitle}' and series='{$rNum}'") or die('SQL错误!');
while(!!$row=mysql_fetch_array($query5,MYSQL_ASSOC)){
		$json5.=json_encode($row).',';
		// print_r($row);
		// echo $row[id];
		
	}
$query6=mysql_query("select * from video6 where title='{$sTitle}' and series='{$rNum}'") or die('SQL错误!');
while(!!$row=mysql_fetch_array($query6,MYSQL_ASSOC)){
		$json6.=json_encode($row).',';
		// print_r($row);
		// echo $row[id];
		
	}
$query7=mysql_query("select * from video7 where title='{$sTitle}' and series='{$rNum}'") or die('SQL错误!');
while(!!$row=mysql_fetch_array($query7,MYSQL_ASSOC)){
		$json7.=json_encode($row).',';
		// print_r($row);
		// echo $row[id];
		
	}
if($json0){
	$json=$json0;
}elseif($json1){
	$json=$json1;
}elseif($json2){
	$json=$json2;
}elseif($json3){
	$json=$json3;
}elseif($json4){
	$json=$json4;
}elseif($json5){
	$json=$json5;
}elseif($json6){
	$json=$json6;
}else{
	$json=$json7;
}
if($json!=''){
// 	while(!!$row=mysql_fetch_array($query,MYSQL_ASSOC)){
// 		$json.=json_encode($row).',';
// 		// print_r($row);
// 		// echo $row[id];
		
// 	}
	//sleep(3);
	echo '['.substr($json, 0,strlen($json)-1).']';
}else{
	echo 0;
}

	mysql_close();
 ?>