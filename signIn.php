<?php 
require 'linkDB.php';
$userName=$_GET['user'];
$userPass=$_GET['pass'];
$query=mysql_query("select user from userinfo where user='{$userName}'and pass='{$userPass}'") or die('SQL错误!');
if(mysql_fetch_array($query,MYSQL_ASSOC)){
	//sleep(3);
	echo 1;
}else{
	//sleep(3);
	echo 0;
}
mysql_close();
 ?>