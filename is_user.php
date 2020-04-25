<?php 
require 'linkDB.php';
$userName=$_GET['userName'];
$userPass=sha1($_GET['userPass']);
$query=mysql_query("select id from userinfo where name='{$userName}'and password='{$userPass}'") or die('SQL错误');
if(mysql_fetch_array($query,MYSQL_ASSOC)){
	//sleep(3);
	echo 1;
}
mysql_close();
 ?>
