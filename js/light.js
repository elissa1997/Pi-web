
var info;
var type;
var para = new Object();

getstate(1);  //打开网页时先获取一次状态

//-------------------------------------------
$(".light1_refresh").click(function(){  //刷新按钮事件
    getstate(1);  //调用获取状态函数
});

$(".light1on").click(function(){  //开启LED事件
    type = "set";
    para.devid = 1;
    para.state = 1;
    ajax(type,para);
    getstate(1);
});
$(".light1off").click(function(){  //关闭LED事件
    type = "set";
    para.devid = 1;
    para.state = 0;
    ajax(type,para);
    getstate(1);
});
//-------------------------------------------

function ajax(type,para){  //发送http请求函数
    para = JSON.stringify(para);
    $.ajax({
        type: "post",
        url: "./gpio.php",
        //      data: "para="+para,  此处data可以为 a=1&b=2类型的字符串 或 json数据。
        data: "type="+type+"&para="+para,
        cache: false,
        async: false,
        dataType: "json",
        success:function(data){  
            info = data;
        }
    });
}

function changeImg(state,devid){   //根据状态更改LED图标
    if(state == "on"){
        $(".light"+devid+"_img").attr("src","./img/ledon.png");
    }else if(state == "off"){
        $(".light"+devid+"_img").attr("src","./img/ledoff.png");
    }
}

function getstate(devid){  //获取状态单独封装函数
    //layer.msg
    type = "get";
    para.devid = devid;
    ajax(type,para);
    if(info[0] == 0){
        changeImg("off",devid);
        layer.msg("LED已关闭");
    }else if(info[0] == 1){
        changeImg("on",devid);
        layer.msg("LED已开启");
    }
}