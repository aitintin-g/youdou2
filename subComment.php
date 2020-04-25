<?php 
require 'linkDB.php';
$index=$_GET['id'];
$aindex=$_GET['aid'];
$comment=$_GET['comment'];
// $index=0;
// $aindex=5;
// $comment='jingcia';
$video='video'.$index;
$query=mysql_query("update {$video} set comment='{$comment}' where id={$aindex}") or die('SQL错误!');
echo $query;
mysql_close();
 ?>