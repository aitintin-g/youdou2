$(function(){
  var record=[];
  var recordStr='';
  var timer1=new Date();
  var preTime=timer1.getTime();
  var nowTime;
  var tArr=[];

  $('#left').click(function(e){
    e.stopPropagation();
    var timer2=new Date();
    nowTime=timer2.getTime();
    var delayTime=nowTime-preTime;
    if(delayTime>=1000&&record.length>0){
       var num=$('.sec').index();
       var prev=num==0?2:num-1;
       var next=num==2?0:num+1;
      $('.sec,.fir').css('transition','');
      $('.sec,.thr').css('transition','all 1.5s ease');
      $('main>div').eq(num).removeClass('sec').addClass('fir');
      $('main>div').eq(prev).removeClass('fir').addClass('thr');
      $('main>div').eq(next).removeClass('thr').addClass('sec');
       
      //弹出该二维数组的最后一个一维数组
      var recordArr=record.pop();

      if(record.length==0){
      $('#left').hide();
      }
      recordStr='';
      for(i=1;i<=record.length;i++){
        recordStr+='<li>'+i+'</li>';
      }
      $('#record').html(recordStr);
      
      preTime=nowTime;

      //恢复之前的电影海报及标题
      restoreMain(recordArr);
      function restoreMain(id){
        $.get('get.php',{id:id},function(data){ 
        var json=$.parseJSON(data);
        for(var i=0;i<8;i++){
            $('.sec .artist').eq(i).find('figcaption').html(json[i].title);
            $('.sec .artist').eq(i).find('img').attr('src','img/'+json[i].title+'.jpg');
        }
            // arrList=json[8];
        });
      }
    }else if(delayTime>=1000&&record.length<=0){
      alert('无法点击');
    }
  });

  $('#right').click(function(e){
    e.stopPropagation();
    var timer2=new Date();
    nowTime=timer2.getTime();
    var delayTime=nowTime-preTime;
    if(delayTime>=1000){
      var num=$('.sec').index();
      var prev=num==0?2:num-1;
      var next=num==2?0:num+1;
      $('.sec,.thr').css('transition','');
      $('.sec,.fir').css('transition','all 1.5s ease');
      $('main>div').eq(num).removeClass('sec').addClass('thr');
      $('main>div').eq(prev).removeClass('fir').addClass('sec');
      $('main>div').eq(next).removeClass('thr').addClass('fir');
      var tempArr=[1];
      recordStr='';
      if(record.length<5){
        record.push(arrList);
      }else{
        record.shift();
        record.push(arrList);
      }

      if(record.length==1){
      $('#left').show();
      }
      

      for(i=1;i<=record.length;i++){
          recordStr+='<li>'+i+'</li>';
      } 
      $('#record').html(recordStr);

      preTime=nowTime;

      //初始化电影海报及标题

      initialMain(8);
    }

  });


  $('#search span').click(function(){
    var sname=$('#search input').eq(0).val();


  });

  
  //点击电影海报显示电影信息
  $('.list>li').hover(function(){
    var pindex=$(this).index();
    var aindex=arrList[pindex];
    getMsg(pindex,aindex);
  });


  //获取一部电影的详细信息
  function getMsg(pindex,aindex){
      setTimeout(function(){
      $.get('get.php',{id:pindex,aid:aindex},function(data){
        var json=$.parseJSON(data);
        // console.log(data);
        $('.sec .artist').eq(pindex).find('.director span').html(json[0].director);
        $('.sec .artist').eq(pindex).find('.protagonist span').html(json[0].protagonist);
        $('.sec .artist').eq(pindex).find('.alias span').html(json[0].alias);
        $('.sec .artist').eq(pindex).find('.origin span').html(json[0].origin);
        $('.sec .artist').eq(pindex).find('.release span').html(json[0].release);
        $('.sec .artist').eq(pindex).find('.update span').html(json[0].update);
       });
      },100);
    }

  //初始化电影海报及标题
  //注意这里的arrList作为全局数据要接受从服务端传回的数据,arrList是当前页面的重要信息

  var arrList=[];
  initialMain(8);

  function initialMain(id){
      $.get('get.php',{id:id},function(data){ 
      var json=$.parseJSON(data);
      for(var i=0;i<8;i++){
          $('.sec .artist').eq(i).find('figcaption').html(json[i].title);
          $('.sec .artist').eq(i).find('img').attr('src','img/'+json[i].title+'.jpg');
      }
          // json[8]是最后加的一个数组，里面有一个页面电影的索引值
          arrList=json[8];

      });
  }


    //定义一个全局变量用于储存一个计时器，便于清除掉该定时器
    var timerFir;
    var timerSec;
    //定义comment全局变量，在提交评论时要将已有评论和新评论组合
    var comment;
    //通过isSubmit判断时候提交过
    var isSubmit;
    //sNum用于另存一个会变化的变量，通过对比可以判断变量是否变化
    //因为js无静态变量，只能使用全局变量
    var sNum;
    var rNum;
    //定义全局变量，点击海报的电影名称
    var sTitle;

    
    //左右移动图标 要取消队列动画，之前就是因为队列动画，hover时，图标突然消失了
    $('#right,#left').hover(function(){
      $(this).stop(true, true).animate({'opacity':.6},500);
    },function(){
      $(this).stop(true, true).animate({'opacity':.1},500);
    });

    // 搜索动画
    $('#search span').click(function(){
      if($('#search input').val()){
        $(this).css('animation','run .5s linear infinite');
        setTimeout(function(){
        $('#search span').css('animation','run .5s linear 1');
      },1500);
      }
    });

    //鼠标放在轮播器上控制轮播
    $('.show_img ul li').hover(function(){
      clearInterval(timerSec);
      $(this).css('background','#eee').siblings().css('background','transparent');
      num=$(this).index();
      console.log(num);
      $('.show_img img').eq(num%3).css('opacity','1').css('z-index','4')
      .siblings('img').css('opacity','0').css('z-index','3');
      num++;
    },function(){
      //这里必须要加一个清除定时器的，不然会出错（不太明白原因）
      //具体出错表现为，轮播器页面打开关闭几次后，鼠标控制轮播器几次后，轮播器变化速度很快
      clearInterval(timerSec);
      timerSec=setInterval(function(){
      $('.show_img img').eq(num%3).css('opacity','1').css('z-index','4')
      .siblings('img').css('opacity','0').css('z-index','3');
      $('.show_img ul li').eq(num%3).css('background','#eee')
      .siblings().css('background','transparent');
      num++;
    },3000);
    });

    //展示页面切换
    $('#show_mid ul li').click(function(e){
       if($(this).index()==0){
        $('#show_left').show();
        $('#show_right').hide();
        //如何提交过一次，就不让提交了，除非关闭后再打开这个页面
        if(isSubmit){
          $('#comment_content textarea').val('');
          $('#comment_content textarea').trigger('keyup');
          $('#comment_input button').css('width','0').css('padding','0').css('border','none');
          $('#comment_input button').text('无法提交');
        }
     }else{
        $('#show_left').hide();
        $('#show_right').show();
     }
       e.stopPropagation();
       $(this).css('background','#333').css('border-width','3px').css('cursor','auto')
       .css('line-height','24px').siblings().css('background','#eee').css('cursor','pointer')
       .css('border-width','1px').css('line-height','28px');
    });

    //关闭界面
    $('#close').click(function(){
      $('.middle').fadeOut();
      $('#left,#right').show();
      $('#record').show();
    });

    //鼠标悬于show_right中的词条上，旁边详细显示
    $('.show_detail span').hover(function(e){
      // alert(e.pageX+'--'+e.pageY);
      $(this).css('cursor','pointer');
      $(this).css('text-decoration','underline');
      var getTop=$(this).offset().top+35;
      var getText=$(this).text();
      // var getTop=e.pageY+35;
      $('#show_detail').css('top',getTop).css('display','block').text(getText);
    },function(){
      // alert(2);
      $('#show_detail').css('display','none');
      $(this).css('text-decoration','none');
    });

    //根据滚动条展示进度，并更换介绍内容
    $('#show_intro').scroll(function(){
      rNum=Math.floor($(this).scrollTop()/567);
      if(rNum!=sNum){
        $('#show_text li').eq(rNum).css('background','#333').siblings().css('background','#ccc');
        sNum=rNum;
        
        $.get('getDepict.php',{sTitle:sTitle,rNum:rNum+1},function(data){
          
          // alert(data);
          //进行if判断时，要将成功返回数据的执行放在else中，否则一直出错
          //进行if判断时，要将成功返回数据的执行放在else中，否则一直出错
          //进行if判断时，要将成功返回数据的执行放在else中，否则一直出错
          if(data.length==1){
            var json=$.parseJSON(data);
            $('.introduce_copy li').eq(0).find('span').html('暂无');
            $('.introduce_copy li').eq(1).find('span').html('暂无');
            $('.introduce_copy li').eq(2).find('span').html('暂无');
            $('.introduce_copy li').eq(3).find('span').html('暂无');
            $('.introduce_copy li').eq(4).find('span').html('暂无');
            $('.introduce_copy li').eq(5).find('span').html('暂无');
            $('.introduce_copy li').eq(6).find('span').html('暂无');
            // alert(data);
          }else{
            var json=$.parseJSON(data);
            // alert(data);
            $('.introduce_copy li').eq(0).find('span').html(json[0].director);
            $('.introduce_copy li').eq(1).find('span').html(json[0].protagonist);
            $('.introduce_copy li').eq(2).find('span').html(json[0].alias);
            $('.introduce_copy li').eq(3).find('span').html(json[0].origin);
            $('.introduce_copy li').eq(4).find('span').html(json[0].release);
            $('.introduce_copy li').eq(5).find('span').html(json[0].update);
            $('.introduce_copy li').eq(6).find('span').html(json[0].depict);
          }
          
        });


      }
      // $('#show_text li').eq(rNum).css('background','#333').siblings().css('background','#ccc');

    });


    //点击一个电影海报执行以下操作
    $('.artist').click(function(){
      //隐藏移动图标和记录图标
      $('#left,#right').hide();
      $('#record').hide();
      //给全局变量STitle赋值
      sTitle=$(this).find('figcaption').text();

      $('.middle').show();
  
      //模拟鼠标点击事件，让页面居于首页
      $('#show_initial').trigger('click');


      
      //获取被点击电影的名字,并展示视频截图
      tSrc=$(this).find('img').attr('src');
      var indexNum=tSrc.indexOf('.');
      tSrc1=tSrc.slice(0,indexNum)+'1.jpg';
      tSrc2=tSrc.slice(0,indexNum)+'2.jpg';
      tSrc3=tSrc.slice(0,indexNum)+'3.jpg';
      // alert(typeof tSrc);
      //返回的string类型
      $('#exhibit').fadeIn();
      $('#show img').eq(0).attr('src',tSrc1);
      $('#show img').eq(1).attr('src',tSrc2);
      $('#show img').eq(2).attr('src',tSrc3);

      //将页面标题设为被点击电影的标题
      $('.title').eq(0).text($(this).find('figcaption').text());

       //轮播器
      clearInterval(timerSec);
      //每次点击进来后要对轮播器初始化，消除上次关闭的css影响
      $('.show_img img').eq(0).css('opacity','1').css('z-index','4')
        .siblings('img').css('opacity','0').css('z-index','3');
        $('.show_img ul li').eq(0).css('background','#eee')
        .siblings().css('background','transparent');
      //这里num的定义是为了3秒后跳转到第二张图
      var num=1;
      timerSec=setInterval(function(){
        $('.show_img img').eq(num%3).css('opacity','1').css('z-index','4')
        .siblings('img').css('opacity','0').css('z-index','3');
        $('.show_img ul li').eq(num%3).css('background','#eee')
        .siblings().css('background','transparent');
        num++;
      },3000);

      //通过模拟滚动条滚动，让页面的怪异的缓存行为消失。去掉这句代码，就可以测试出怪异行为了
      $('#show_intro').trigger('scroll');

    });

    
    //这段代码放在.artist的click时间下，会累积弹出之前点过的电影 
    var url;
    $('.play img').on('click',function(e){
      window.open(url);
      // e.stopPropagation();
      // e.preventDefault();
      // alert(e.target);
      // alert(url); 
    }); 


    //通过ajax与服务器交互
    $('.artist').click(function(e){

    var pindex=$(this).index();
    var aindex=arrList[pindex];
    var depict;
    

    $.get('get.php',{id:pindex,aid:aindex,fresh:Math.random()},function(data){
        //回调函数保证了执行下列操作时，data已经有值
        //加随机值，解决ajax缓存造成的bug
        var json=$.parseJSON(data);
        depict=json[0].depict;
        url=json[0].uri;
        // alert(typeof depict);
        if(depict){
          for(j=1;j<7;j++){
            $('#resume ul li').eq(j).text(depict.slice((j-1)*22,j*22-1));
          }
        }else{
          depict='';
          for(j=1;j<7;j++){
            $('#resume ul li').eq(j).text(depict.slice((j-1)*22,j*22-1));
          }
        }
        // alert(url);
        // $('.play img').click(function(e){
        //   // window.open(url);
        //   // e.stopPropagation();
        //   // e.preventDefault();
        //   // alert(e.target);
        //   alert(url); 
        // });


    });

    //不使用回到函数时，则要延时执行，保证能够获取data的值
    // setTimeout(function(){
    //   if(depict){
    //     for(j=1;j<7;j++){
    //       $('#resume ul li').eq(j).text(depict.slice((j-1)*22,j*22-1));
    //     }
    //   }else{
    //     depict='';
    //     for(j=1;j<7;j++){
    //       $('#resume ul li').eq(j).text(depict.slice((j-1)*22,j*22-1));
    //     }
    //   }
       
    // },500);

    //评论展示
    
    $.get('getComment.php',{id:pindex,aid:aindex},function(data){
      var json=$.parseJSON(data);
      //comment使用全局变量，以便更新评论时调用，js无静态变量
      comment=json[0].comment;
      var bNum=1;
      var commentList=comment.split('~');
      var commentLen=commentList.length;
      //没有返回的数据，数组的长度依然为1
      // alert(commentLen);
      if(commentLen==1){
        $('#blink p').eq(0).html(commentList[0]);
        $('#blink p').eq(1).html(commentList[0]);
      }else{
        $('#blink p').eq(0).html(commentList[0]);
        $('#blink p').eq(1).html(commentList[1]);
      }

      //每次点击进来都会生成一个计时器，会有越来越多的计时动画被执行
      //解决办法，每次点击后将上一次的计时器清除点
      clearInterval(timerFir);
      timerFir=setInterval(function(){
        $('#blink').css('display','none');
        $('#blink p').eq(0).html(commentList[(bNum++)%commentLen]);
        $('#blink p').eq(1).html(commentList[bNum%commentLen]);

      setTimeout(function(){
          $('#blink').css('display','block');
      },100);
      },3000);

    });
    


    //固定li元素背景
    //获取这个系列的多张海报及总数量
    var totalNum=0;
    var imgArr=[];
    //sTitle全局变量，电影的系列名
    $.get('getSer.php',{sTitle:sTitle},function(data){
        var json=$.parseJSON(data);
        //进行if判断时，要将成功返回数据的执行放在else中，否则一直出错
        //进行if判断时，要将成功返回数据的执行放在else中，否则一直出错
        //进行if判断时，要将成功返回数据的执行放在else中，否则一直出错
        if(data.length==1){
          totalNum=3;
          $('#show_intro').html('<li></li>');
          $('#show_text').html('<li></li>');
          $('#show_intro li').eq(0).css('background','url(img/b.jpg) no-repeat 146px 132px fixed');
          $('.introduce_copy li').eq(0).find('span').html('');
            $('.introduce_copy li').eq(1).find('span').html('');
            $('.introduce_copy li').eq(2).find('span').html('');
            $('.introduce_copy li').eq(3).find('span').html('');
            $('.introduce_copy li').eq(4).find('span').html('');
            $('.introduce_copy li').eq(5).find('span').html('');
            $('.introduce_copy li').eq(6).find('span').html('');
          tagSer=false;
            
        }else{
          $.each(json[0],function(i,val){
            if(val){
              totalNum++;
              imgArr.push(val);
            }
            tagSer=true;
          });

          var seriesStr='';
          for(i=2;i<totalNum;i++){
                seriesStr+='<li></li>';
             }
          $('#show_intro').html(seriesStr);
          $('#show_text').html(seriesStr);
          var liWid=(500/totalNum);
          $('#show_text li').css('width',liWid);
          $('#show_intro li').css('background','url() no-repeat 146px 132px fixed');
          var imgNum=totalNum-1;

          //系列电影的海报
          for(i=0;i<imgNum;i++){
                $('#show_intro li').eq(i).css('backgroundImage','url('+imgArr[i+2]+')');
             }
        }
        

        //这里图片的路径规则特别怪异 正常是../img/b.jpg
        //这里图片的路径规则特别怪异 正常是../img/b.jpg
        //这里图片的路径规则特别怪异 正常是../img/b.jpg
        // $('#show_intro li').eq(0).css('background','url(img/a.jpg) no-repeat 146px 132px fixed');
        // $('#show_intro li').eq(1).css('background','url(img/b.jpg) no-repeat 146px 132px fixed');
        // $('#show_intro li').eq(2).css('background','url(img/c.jpg) no-repeat 146px 132px fixed');
        // $('#show_intro li').eq(3).css('background','url(img/d.jpg) no-repeat 146px 132px fixed');
        // $('#show_intro li').eq(4).css('background','url(img/e.jpg) no-repeat 146px 132px fixed');

        // alert(totalNum);
        });


    //ajax提交评论
    //初始化信息
    $('#comment_input button').text('提交').css('background','#ccc');
    $('#comment_content textarea').val('');
    $('#comment_content textarea').trigger('keyup');
    $('#comment_input button').css('width','0').css('padding','0').css('border','none');
    $('#comment_input button').click(function(){
      if(comment){
        var com=$('#comment_content textarea').val()+'~'+comment;
      }else{
        var com=$('#comment_content textarea').val();
      }
      //ajax不属于click的默认行为，无法阻止
      // e.preventDefault();
      if(!isSubmit){
        $.get('subComment.php',{id:pindex,aid:aindex,comment:com},function(data){
           if(data==1){
            $('#comment_input button').text('提交成功').css('background','#333');
           }
      });
      }
    });
   

  });



 //评论字数统计
 var nlen;
 $('#comment_content textarea').keyup(function(){
    nLen=$(this).val().length;
    // alert(nLen.length);
    if(nLen>50){
      $('#textarea_inform span').css('color','red');
    }else{
      $('#textarea_inform span').css('color','#00BFFF');
    }
    $('#textarea_inform span').text(nLen);
  });

  //显示提交按钮
  $('#comment_content textarea').blur(function(){
    // alert(nLen);
    if(nLen>50||nLen==0){
      $('#comment_input button').css('width','0').css('padding','0').css('border','none');
    }else{
      $('#comment_input button').css('width','45px')
      .css('padding','5px').css('border','2px buttonface outset');
    }
  }).focus(function(){
      $('#comment_input button').css('width','0').css('padding','0').css('border','none');
  });


  //登录和注册标签
  times=-1;
  setInterval(function(){
    $('#cube').css('transform','rotateX('+120*times+'deg)');
    times--;
  },3000);

  $('#cube div').eq(0).click(function(){
    $('#signIn').css('display','block');
    $('#signUp').css('display','none');
    $('#lock').css('display','block');
    $('#signIn button').text('登录');
    isLogin=false;
    $('#name').val('');
    $('#password').val('');
  });
  $('#cube div').eq(1).click(function(){
    $('#signIn').css('display','none');
    $('#signUp').css('display','block');
    $('#lock').css('display','block');
    $('#table').get(0).reset();
    $('table span').text('');
    //$('#table span')这种写法获取form下的span，获取不到
    // console.log($('table span').size());
    isSub=false;
  });
  $('#cube div').eq(2).click(function(){
    alert('暂不支持');
  });


  //登录注册界面居中显示
  //$(window).width获取视窗的尺寸，浏览器窗口变化，尺寸也变化
  //$(document).width获取document文档尺寸，不随浏览器窗口变化
  function center(){
    var divILeft=($(window).width()-$('#signIn').width())/2;
    var divITop=($(window).height()-$('#signIn').height())/2;
    var divULeft=($(window).width()-$('#signUp').width())/2;
    var divUTop=($(window).height()-$('#signUp').height())/2;
    if(divILeft<0){
      divILeft=0;
    }
    if(divITop<0){
      divITop=0;
    }
    if(divULeft<0){
      divULeft=0;
    }
    if(divUTop<0){
      divUTop=0;
    }
    $('#signIn').css('left',divILeft).css('top',divITop);
    $('#signUp').css('left',divULeft).css('top',divUTop);
  }

  center();

  //浏览器窗口变化，div要重新计算居中位置
  $(window).resize(function(){
    center();
  });


  //关闭和切换登录注册界面
  $('.close').click(function(){
    $(this).parent().css('display','none');
    $('#lock').css('display',' none');
  });

  $('#change span').eq(0).click(function(){
    $('#signIn').css('display','none');
    $('#signUp').css('display','block');
  });


  //提交登录信息
  var isLogin;
  $('#signIn button').click(function(){
      var userName=$('#name').val();
      var userPass=$('#password').val();
      if(!isLogin&&userName&&userPass){
        $('#signIn button').text('登录中...');
        if(userName.length>1&&userName.length<21&&userPass.length>5){
          $.get('is_user.php',{userName:userName,userPass:userPass},function(data){
             alert(data);
             if(data==1){
              $('#signIn button').text('登录成功');
              $('#cube div').eq(0).text('您好！'+userName);
              isLogin=true;
             }else{
              $('#signIn button').text('登录失败');
             }
          });
        }else{
          $('#signIn button').text('登录失败');
          // $('#cube div').eq(0).text('您好！'+userName).css('letterSpacing','1px');
        }
      }
      
  });
  //登录按钮重置
  $('#name').focus(function(){
    $('#signIn button').text('登录');
  });


  //验证及提交注册信息

  //表单初始化
  $('#table').get(0).reset();
  //设置全局变量flag*用于判断表单的各项是否满足提交条件
  //表单的每项都要给出是否满足提交条件判断
  var flagF;
  var flagS;
  var flagT;
  var flagFo;
  var flagFi;
  var flagSi;
  var isSub;

  //验证userinput是否合法
  $('input[name=user]').focus(function(){
    // console.log('userinput');
    $(this).parent().find('span').text('');
    // $('#table').get(0).reset();
  });

  $('input[name=user]').blur(function(){
    var val=$.trim($(this).val());
    if(val.length!=0){
      if(val.length>1&&val.length<21){
        $(this).parent().find('span').text('查询中...');
        $.get('is_user.php',{user:val},function(data){
          // alert(data);
          if(data!=1){
            $('input[name=user]').parent().find('span').text('ok');
            flagF=true;
          }else{
            $('input[name=user]').parent().find('span').text('用户名已占用');
            flagF=false;
          }
        });
        
        }else{
          $(this).parent().find('span').text('用户名不合法');
          flagF=false;
        }
    }else{
      $(this).parent().find('span').text('');
      flagF=false;
    }
  });

  //验证password是否合法
  $('input[name=password]').focus(function(){
    var val=$.trim($(this).val());
    $(this).parent().find('span').text('');
    var code_length=0;
    //判断密码的安全级别
    if(/[\d]/.test(val)){
      code_length++;
    }
    if(/[a-z]/.test(val)){
      code_length++;
    }
    if(/[A-Z]/.test(val)){
      code_length++;
    }
    if(/[^\w]/.test(val)){
      code_length++;
    }


    if(val.length>=10&&code_length>=3){
      $(this).parent().find('span').text('安全级别：● ● ●');
    }else if(val.length>=8&&code_length>=2){
      $(this).parent().find('span').text('安全级别：● ● ○');
    }else if(val.length>=6){
      $(this).parent().find('span').text('安全级别：● ○ ○');
    }else if(val){
      $(this).parent().find('span').text('安全级别：○ ○ ○');
    }

  });

  $('input[name=password]').keyup(function(){
    //每次更改密码时，要重置确认密码中的值，可以省去再去判断
    $('input[name=passSure]').val('');
    $('input[name=passSure]').parent().find('span').text('');

    var val=$.trim($(this).val());
    var code_length=0;
    //判断密码的安全级别
    if(/[\d]/.test(val)){
      code_length++;
    }
    if(/[a-z]/.test(val)){
      code_length++;
    }
    if(/[A-Z]/.test(val)){
      code_length++;
    }
    if(/[^\w]/.test(val)){
      code_length++;
    }


    if(val.length>=10&&code_length>=3){
      $(this).parent().find('span').text('安全级别：● ● ●');
    }else if(val.length>=8&&code_length>=2){
      $(this).parent().find('span').text('安全级别：● ● ○');
    }else if(val.length>=6){
      $(this).parent().find('span').text('安全级别：● ○ ○');
    }else{
      $(this).parent().find('span').text('安全级别：○ ○ ○');
    }

  });

  $('input[name=password]').blur(function(){
    var val=$.trim($(this).val());
    if(val.length!=0){
      if(val.length>5&&val.length<21){
        $(this).parent().find('span').text('ok');
        flagS=true;
      }else{
        $(this).parent().find('span').text('密码不合法');
        flagS=false;
      }
    }else{
      $(this).parent().find('span').text('');
      flagS=false;
    }
  });

  //判断passsure是否合法
  $('input[name=passSure]').focus(function(){
    $(this).parent().find('span').text('');
  });

  $('input[name=passSure]').blur(function(){
    var val=$.trim($(this).val());
    if(val.length!=0){
      var comVal=$.trim($('input[name="password"]').val());
      if(val==comVal){
        $(this).parent().find('span').text('ok');
        flagT=true;
      }else{
        $(this).parent().find('span').text('密码不一致');
        flagT=false;
      }
    }else{
      flagT=false;
    }
  });

  $('input[name=answer]').blur(function(){
     
      var val=$.trim($('input[name=answer]').val());
      if($('select[name=question]').val()=='0'){
          $('input[name=answer]').val('');
          $('input[name=answer]').parent().find('span').text('');
          flagFo=false;
      }else{
          if(val.length>=2&&val.length<=20){
            $('input[name=answer]').parent().find('span').text('ok');
            flagFo=true;
          }else if(val){
            $('input[name=answer]').parent().find('span').text('回答不合法');
            flagFo=false;
          }else{
            $('input[name=answer]').parent().find('span').text('请回答上面问题');
            flagFo=false;
          }
      }

    });

  $('input[name=answer]').focus(function(){
    $(this).parent().find('span').text('');
  });

  //当选择的问题变化时，不管answer有无值，都清空
  $('select[name=question]').change(function(){
    $('input[name=answer]').val('');
    $('input[name=answer]').parent().find('span').text('');
    flagFo=false; //每次清空后，用于判断的flagFo要重置
  });


  //判断邮箱是否合法并提供补全功能
  $('input[name=email]').focus(function(){
    $('input[name=email]').parent().find('span').text('');
    if($(this).val().indexOf('@')==-1){
      $('#email li span').text($(this).val());
      $('#email').css('display','block');
    }else{
      $('#email').css('display','none');
    }
  });

  $('input[name=email]').blur(function(){
      $('#email').css('display','none');
      var val=$.trim($(this).val());
      if(val.length!=0){
        if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test($('input[name="email"]').val())){
          $('input[name=email]').parent().find('span').text('ok');
          flagFi=true;
        }else{
          $('input[name=email]').parent().find('span').text('邮箱格式不合法');
          flagFi=false;
        }
      }else{
        flagFi=false;
      }
  });
  
  //这里的click也会触发input的blur事件
  $('#email li').click(function(){
    $('input[name=email]').val($(this).text());
  });
  
  
  $('input[name=email]').keyup(function(){
    if($(this).val().indexOf('@')==-1){
      $('#email li span').text($(this).val());
      $('#email').css('display','block');
    }else{
      $('#email').css('display','none');
    }

    //按下向下键时，实际鼠标为移除，通过让#email li变色模拟鼠标移动
    //this.index作为一个对象属性在第一次按下向下键被创建
     if(event.keyCode==40){
        if(this.index==undefined||this.index>=$('#email li').length-1){
          this.index=0;
        }else{
          this.index++;
        }
     }
     $('#email li').eq(this.index).css('background','#666').siblings().css('background','pink');

     if(event.keyCode==38){
        if(this.index==undefined||this.index<0){
          this.index=4;
        }else{
          this.index--;
        }
     }
     $('#email li').eq(this.index).css('background','#666').siblings().css('background','pink');

     if(event.keyCode==13){
       $(this).val($('#email li').eq(this.index).text());
       $('#email').hide();
       this.index=undefined;
    } 
        
  });

  //click时间是鼠标弹起触发，鼠标弹起时，已经属于blur，界面隐藏，使用mousedown可以解决这个问题
    $('#email li').mousedown(function(){
       $('input[name=email]').val($(this).text());
       this.index=undefined;
    });

    $('#email li').hover(function(){
       $(this).css('background','#666').siblings().css('background','#ccc');
    },function(){
       $(this).css('background','#ccc');
    });



  //向生日select标签中注入年月日
  var year='<option>---年---</option>';
  for(var i=2019;i>1919;i--){
      year+='<option>'+i+'</option>';
  }
  $('select[name=year]').html(year);

  var month='<option>---月---</option>';
  for(var i=1;i<13;i++){
      month+='<option>'+i+'</option>';
  }
  $('select[name=month]').html(month);

    
  $('#day').html('<option>---日---</option>');
  var dayNum=['1','3','5','7','8','10','12'];
  $('#month,#year').change(function(){
    $(':input[name=year]').parent().find('span').text('');
    var day='<option>---日---</option>'; 
    if($('#month').val()==2){
      if($('#year').val()%100==0){
        if($('#year').val()%4==0){
          for(var i=1;i<30;i++){
            day+='<option>'+i+'</option>';
          }
            
        }else{
          for(var i=1;i<29;i++){
            day+='<option>'+i+'</option>';
          }
        }
      }else{
          if($('#year').val()%4==0){
            for(var i=1;i<30;i++){
              day+='<option>'+i+'</option>';
            }
          }else if($('#year').val()>0){
            for(var i=1;i<29;i++){
              day+='<option>'+i+'</option>';
              }
          }
      }
    }else if($('#month').val()>0){
        if($.inArray($('#month').val(),dayNum)!=-1){
          for(var i=1;i<32;i++){
            day+='<option>'+i+'</option>';
            }
            // console.log($.inArray($('#month').val(),dayNum));
        }else{
          for(var i=1;i<31;i++){
              day+='<option>'+i+'</option>';
            }
        }
    }
    $('#day').html(day);
      flagSi=false;
      // console.log(flagSi);
  });


  //判断生日是否填写
  $('#day').blur(function(){
    var year=$('#year').val();
    var month=$('#month').val();
    if(year&&month){
      flagSi=true;
      // console.log(flagSi);
    }else{
      flagSi=false;
    }
  });

    
  //判断是否可以提交
  $('#signUp button').click(function(){
    var flagSub=true;
    if(!flagF){
    $('input[name="user"]').parent().find('span').text('用户名不合法');
      flagSub=false;
    }
      
    if(!flagS){
      $('input[name=password]').parent().find('span').text('密码不合法');
      flagSub=false;
    }

    if(!flagT){
      $('input[name=passSure]').parent().find('span').text('确认密码不合法');
      flagSub=false;
    }

    if(!flagFo){
      $('input[name=answer]').parent().find('span').text('问题回答不合法');
      flagSub=false;
    }

    if(!flagFi){
      $('input[name=email]').parent().find('span').text('邮箱不合法');
      flagSub=false;
    }

    if(!flagSi){
      $(':input[name=year]').parent().find('span').text('日期不合法');
      flagSub=false;
    }

    if(flagSub){
      if(!isSub){
        $('#signUp button').text('注册中...').css('background','#ccc');
        var emit=$('#table').serialize();
        $.get('signUp.php',emit,function(data){
          alert(data);
          $('#signUp button').text('注册成功').css('background','#666');
          isSub=true;
        })
        
      }
    }else{
      // console.log('发送失败');
      // $('#signUp button').text('注册失败').css('background','#666');
    }

  });



  //鼠标拖拽
  $('#signIn h2,#signUp h2').mousedown(function(e){
    //鼠标点下时获取要移动元素距离鼠标的位置
    var diffX=e.pageX-$(this).parent().offset().left;
    var diffY=e.pageY-$(this).parent().offset().top;
    // alert($(this).offset().top);
    _this=$(this).parent();
    
    //点击某个物体，用oDiv即可，move和up是全局区域，也就是整个文档通用，应该用ducument
    $(document).bind('mousemove',function(e){
      //每次鼠标移动时，都会获取到鼠标的位置，并根据要移动元素的相对鼠标的距离，确定位置
      //对将要到达的位置进行判断，如果位置超出边界，强行调整至边界内
      var left=event.pageX-diffX;
      var top=event.pageY-diffY;
      //因为鼠标移动时不断触发的，所以要不停获取div的最新位置，与鼠标的相对位置固定不变
      var divLeft=_this.offset().left;
      var divTop=_this.offset().top;
      //获取当前视口的尺寸
      var getInnerH=$(document).height();
      var getInnerW=$(document).width();
      if(left<0){
          left=0;
      }else if(left<=$(this).scrollLeft()){
          left=$(this).scrollLeft();
      }else if(left>getInnerW+$(this).scrollLeft()-_this.width()){
          left=getInnerW+$(this).scrollLeft()-_this.width();
      }
      if(top<0){
          top=0;
      }else if(top<=$(this).scrollTop()){
          top=$(this).scrollTop();
      }else if(top>getInnerH+$(this).scrollTop()-_this.height()){
          top=getInnerH+$(this).scrollTop()-_this.height();
      }

      $(_this).css('left',left).css('top',top);
      // console.log(top);

      if(typeof _this.setCapture!='undefined'){  //IE的移动捕获
        this.setCapture();
      }


    });

    $(document).mouseup(function(){
       $(document).unbind('mousemove');
       if(typeof _this.releaseCapture!='undefined'){
        _this.releaseCapture();
       }
    });

  });



  //响应式布局
  // console.log($(document).width());
  // console.log($(document).height());
  // console.log($(window).width());
  // console.log($(window).height());
  // console.log($('html').width());
  // console.log($('html').height());
  // console.log($('body').width());
  // console.log($('body').height());
  //document,html,body的宽度相等810，window的高度是整个浏览器视口减去控制台高度
  // window的高度是会随窗口变化而变化的
  //所有高度都不含浏览器的头部
  
  //查询窗口高度，并设置展示区的高度，最小不小于700
  var mainHeight=$(window).height();
  mainHeight=mainHeight>700?mainHeight:700;
  $('#main').css('height',mainHeight+'px');
  // 电影列表上间距占10%，aside层同理
  var listMT=mainHeight*0.1;
  $('.list').css('margin-top',listMT+'px');
  $('.header').css('height',listMT+'px');
  //电影列表区域占80%，aside层同理
  var showHight=mainHeight*0.8;
  $('aside .middle').css('height',showHight+'px');
  //设置.footer的top值
  var fTop=mainHeight-60;
  $('#cycle').css('top',fTop+'px');
  // $('.middle').css('margin-top',listMT+'px');
  // console.log($(window).height());
  $(window).on('resize',function(){
    mainHeight=$(window).height();
    mainHeight=mainHeight>700?mainHeight:700;
    $('#main').css('height',mainHeight+'px');
    listMT=mainHeight*0.1;
    $('.list').css('margin-top',listMT+'px');
    $('.header').css('height',listMT+'px');
    showHight=mainHeight*0.8;
    $('aside .middle').css('height',showHight+'px');
    fTop=mainHeight-60;
    $('#cycle').css('top',fTop+'px');
  });

  // console.log($('#resume').height());
  // console.log($('#resume ul').height());
  // console.log($('#resume li').height());
  // var resumeHeight=$('#resume').height();
  // $('#resume li').css('height',resumeHeight+'px');

  
 




   

    






});

