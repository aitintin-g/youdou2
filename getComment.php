<?php 
require 'linkDB.php';
$index=$_GET['id'];
$aindex=$_GET['aid'];
$video='video'.$index;
$query=mysql_query("select comment from {$video} where id={$aindex}") or die('SQL错误!');
while(!!$row=mysql_fetch_array($query,MYSQL_ASSOC)){
		$json.=json_encode($row).',';
		// print_r($row);
		// echo $row[id];
		
	}
	//sleep(3);
	echo '['.substr($json, 0,strlen($json)-1).']';
	mysql_close();
 ?>