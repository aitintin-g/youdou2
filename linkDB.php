<?php
   header('Content-Type:text/html;charset=utf8');

  define('DB_HOST','xdm294599509.my3w.com');
  define('DB_USER','xdm294599509');
  define('DB_PWD','135790ab');
  define('DB_NANE','xdm294599509_db');

  $conn=@mysql_connect(DB_HOST,DB_USER,DB_PWD) or die('数据库连接失败'.mysql_error());
  @mysql_select_db(DB_NANE) or die('数据库错误'.mysql_error());

  @mysql_query('set names utf8');
?>