<?php
if(isset($_POST['type'])){  //传入的操作类型  
    $type = $_POST['type'];  
}else{  
    $type = "";  
}

if(isset($_POST['para'])){  //传入的引脚编号，开启或关闭参数
    $para = $_POST['para'];  
}else{  
    $para = "";  
}

//---------------------------------------

$op = json_decode($para);

if($type == "get"){  //获取引脚状态
    exec("gpio read $op->devid",$result,$status);
    echo json_encode($result);
}else if($type == "set"){ //设定引脚高低电平
    exec("gpio mode $op->devid out");
    exec("gpio write $op->devid $op->state");
}

?>