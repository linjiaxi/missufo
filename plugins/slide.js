/**
 * Created by acer on 2016/4/5.
 */
$.fn.extend({
    slidePic:function(data){
        var $this = $(this),
            picWidth,
            picHeight,
            num,//图片数量
            positionLeft,
            i,
            circleColor,//圆圈颜色
            defaults = {
                width:"800px",
                height:"300px",
                number:2,//图片数量
                hasCircle:true,
                circleColor:"blue",
                time:2000,
                circleWidth:5//圆圈大小
            },
            time,//定时器
            //初始化变量
            data = $.extend({},defaults,data);
        father = $this.parent();
        circleColor = data.circleColor;

        //如果宽高使用百分比，则分别处理宽高
        if(data.width.indexOf("%")>0){
            var winWidth = $(window).width(),
                winHeight = $(window).height();

            picWidth = winWidth*(parseInt(data.width)/100);
            picHeight = winHeight*(parseInt(data.height)/100);
        }else{
            picWidth = data.width;
            picHeight = data.height;
        }

        $this.css({
            width:picWidth,
            height:picHeight
        });
        father.css({
            width:picWidth,
            height:picHeight
        });
        num = data.number;
        positionLeft = $this.position().left;
        //是否有小圆圈
        if(data.hasCircle){
            createCircle();
        }
        //生成小圆圈函数
        function createCircle(){
            var y = 0,
                circle=$("<div>");
                spanCicles = "";
            for(y;y<num;y++){
                spanCicles += "<span class='circle'></span>";
            }
            circle.html(spanCicles);
            father.append(circle);
            $(".circle:eq(0)").css("background",circleColor);
            circle.css({
                width:(data.circleWidth*3)*num+"px",
                height:data.circleWidth*2+"px",
                position:"absolute",
                top:"80%",
                left:"50%",
                //marginLeft:-circle.width()/2+"px",
            });
            $(".circle").css({
                //position:"relative",
                display:"inline-block",
                width:data.circleWidth,
                height:data.circleWidth,
                border:"1px solid #eeeeee",
                borderRadius:data.circleWidth,
            })
                .each(function(index,ele){
               $(this).css("margin-right",data.circleWidth+"px");
            });
        }
        //自动播放函数
        i = 0;
        function autoShowPic(){
            positionLeft = i*-parseInt(picWidth)+"px";
            $this.animate({
                left:positionLeft
            },data.time/2,"linear",function(){
                $(".circle").css("background","");
                $(".circle").eq(i-1).css("background",circleColor);
            });
            i ++;
            i >= num?i = 0:i = i;
        }
        setInterval(autoShowPic,data.time);
    }
});