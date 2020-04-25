<?php 
require 'linkDB.php';
//获取ajax传来的id,选择对应的表格
$index=$_GET['id'];
$aindex=$_GET['aid'];
// $index=9;
// $index=array(1,2,3,4,3,5,2,6);
$arr1=array();
if($index==8){
   for($i=0;$i<8;$i++){
    // switch($i){
	   // case 0:$video='video0';
	   // break;
	   // case 1:$video='video1';
	   // break;
	   // case 2:$video='video2';
	   // break;
	   // case 3:$video='video3';
	   // break;
	   // case 4:$video='video4';
	   // break;
	   // case 5:$video='video5';
	   // break;
	   // case 6:$video='video6';
	   // break;
	   // case 7:$video='video7';
	   // break;	
	   // }

    //$video的变换简化
    $video='video'.$i;

	$query=mysql_query("select count(*) from {$video}");
	// print_r(mysql_fetch_row($query));
	$total=mysql_fetch_row($query);
	$num='num'.$i;
	$$num=ceil(mt_rand(1,$total[0]));
	// echo $num1;
	// echo "<br>";
	$arr1[]=$$num;
	$query=mysql_query("select title from {$video} where id={$$num}") or die('SQL错误!');
	$row=mysql_fetch_array($query,MYSQL_ASSOC);
	$json.=json_encode($row).',';
	// echo $arr1[$i-1];


     }
    $json.=json_encode($arr1).',';
	echo '['.substr($json, 0,strlen($json)-1).']';

	mysql_close();
}elseif($index>=0&&$index<8){
	$video='video'.$index;

    $query=mysql_query("select * from {$video} where id={$aindex}") or die('SQL错误!');
	// $row=mysql_fetch_array($query,MYSQL_ASSOC);
	// print_r($row);
	// $row=mysql_fetch_array($query,MYSQL_ASSOC);
	// print_r($row);	

	// while($row=mysql_fetch_array($query,MYSQL_ASSOC)){
	// 	$str="";
	// 	foreach($row as $val){
	// 		$str.=$val;
	// 	}
	// 	echo $str;
	// }

	// $row=mysql_fetch_array($query,MYSQL_ASSOC);
	// //print_r($row);
	// $json="";
	// $json=json_encode($row);
	// // echo "[".$json."]";
	// $json='';

	while(!!$row=mysql_fetch_array($query,MYSQL_ASSOC)){
		$json.=json_encode($row).',';
		// print_r($row);
		// echo $row[id];
		
	}
	//sleep(3);
	echo '['.substr($json, 0,strlen($json)-1).']';
	mysql_close();
}elseif(is_array($index)){
    for($i=0;$i<8;$i++){
    	$nindex=$index[$i];
        $video='video'.$i;
        // echo $video;
        // echo '</br>';
        // echo $nindex;
        $query=mysql_query("select title from {$video} where id={$nindex}") or die('SQL错误!');
	    $row=mysql_fetch_array($query,MYSQL_ASSOC);
	    $json.=json_encode($row).',';
    }
    echo '['.substr($json, 0,strlen($json)-1).']';
	mysql_close();
}




 ?>