<?php
// echo 'www.ycku.com';
// print_r($_GET['answer']);
require 'linkDB.php';
$birth=$_GET['year'].'-'.$_GET['month'].'-'.$_GET['day'];

$query="insert into userinfo(name,password,question,answer,email,birth) values('{$_GET['user']}',sha1('{$_GET['password']}'),'{$_GET['question']}','{$_GET['answer']}','{$_GET['email']}','{$birth}')";
mysql_query($query) or die('新增失败'.mysql_errno());

//sleep(3);

echo mysql_affected_rows();

mysql_close();
?>