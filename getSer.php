<?php 
require 'linkDB.php';
$sTitle=$_GET['sTitle'];
$query=mysql_query("select * from series where title='{$sTitle}'") or die('SQL错误!');
while(!!$row=mysql_fetch_array($query,MYSQL_ASSOC)){
		$json.=json_encode($row).',';
		// print_r($row);
		// echo $row[id];
		
	}
	//sleep(3);
	if($json){
		echo '['.substr($json, 0,strlen($json)-1).']';
	}else{
		echo 0;
	}
	
	mysql_close();
 ?>