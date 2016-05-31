/**
 * Created by acer on 2016/5/30.
 */
$.fn.extend({
    createCalendar:function(data){

        //定义变量
        var $this = $(this),
            nowDate = new Date(),
            ynow = nowDate.getFullYear(),
            mnow = nowDate.getMonth(),
            dnow = nowDate.getDate(),
            data = data || {},
            calendarE,//日历对象
            calendarT,//日历具体日期对象
            calendarH,//日历头部
            calendarSelect,//下拉框元素
            defaults = {
                headerBackground:"#eeeeee",
                headerColor:"black",
                mainBackground:"black",
                mainColor:"#eeeeee",
                width:"40%",
                headerHeight:"80px",
                positionLeft:"50%",
                positionTop:"50%"
            };

        data = $.extend({},defaults,data);



        createHeader(ynow,mnow);//生成日历，插入body
        //变量初始化
        calendarE = $(".calendar");
        calendarT = $(".calendarTable");
        calendarH = $(".calendarHeader");
        calendarSelect = calendarH.find("select");
        //初始化日历样式
        calendarE.css({
            position:"absolute",
            left:data.positionLeft,
            top:data.positionTop,
            width:data.width,
            zIndex:100
        });
        /*calendarH.css({
            background:data.headerBackground,
            color:data.headerColor,
        });*/
        calendarT.css({
            background:data.headerBackground,
            color:data.headerColor
        });

        //判断输入日历宽度是百分比还是其他
        if(data.width.indexOf("%")>0){
            //拿到设备的宽度
            var winWidth = $(window).width(),
                calendarWidth = winWidth*parseInt(data.width)/100;//calendar���

            //日历样式
            calendarH.find("select").css({
                width:calendarWidth/3+"px"
            });
            calendarT.find("table").css({
                width:calendarWidth+"px"
            });
            calendarT.find("td").css({
                height:calendarWidth/14+"px"
            });
            calendarE.css({
                marginLeft:-calendarWidth/2+"px",
                marginTop:-(calendarE.height())/2+"px"
            });
        }else{

            calendarH.find("select").css({
                width:parseInt(data.width)/3+"px"
            });
            calendarT.find("tr").css({
                width:parseInt(data.width)+"px"
            });
            calendarT.find("td").css({
                height:parseInt(data.width)/14+"px"
            });
            calendarE.css({
                marginLeft:parseInt(data.width)/2+"px",
                marginTop:-(calendarE.height())/2+"px"
            });
        }

        //监听下拉款选中事件
        calendarSelect.on("change",function(){
            var selectY = $(".selectY").val(),
                selectM = $(".selectM").val()- 1,
                table = createCalendar(selectY,selectM);

            if(selectY != ynow || selectM != mnow){
                calendarT.find("td").each(function(index,ele){

                        $(this).css({
                            background:"#eeeeee"
                        })
                })
            }
            calendarT.find("td").each(function(index,ele){
                $(this).html(table.find("td").eq(index).html());
            })

        });

        //鼠标划过，td变色
        calendarT.find("td").each(function(index,ele){

            $(this).mouseover(function(){
                $(this).css({
                    background:"yellow"
                })
            }).mouseout(function(){
                $(this).css({
                    background:"#eeeeee"
                })
            })
            //点击相应的日期输出相应的日期
            $(this).click(function(){
                var selectY = $(".selectY").val(),
                    selectM = $(".selectM").val(),
                    date = $(this).html();

                $this.val(selectY+"/"+selectM+"/"+date);
                calendarE.css("display","none");
            })
        });





        //判断是否为闰年
        function is_leap(year){
            return (year%100 == 0?res = (year%400 == 0?1:0):res = (year%4 == 0?1:0));
        }
        function createHeader(year,month){
            var calDiv = $("<div class='calendar'/>"),
                calHeader = $("<div class='calendarHeader' align='center'>"),
                tableDiv,//日历日期主要部分
                selectYear = $("<select class='selectY'/>"),
                selectMonth = $("<select class='selectM'/>"),
                selectTime = $("<select class='selectT'/>");
            selectYear.append("<option value='2016'>2016</option><option value='2017'>2017</option>" +
                "<option value='2018'>2018</option><option value='2018'>2019</option><option value='2018'>2020</option>");
            selectMonth.append("<option value='1'>1月</option><option value='2'>2月</option>" +
                "<option value='3'>3月</option><option value='4'>4月</option><option value='5'>5月</option>" +
                "<option value='6'>6月</option><option value='7'>7月</option><option value='8'>8月</option>" +
                "<option value='9'>9月</option><option value='10'>10月</option><option value='11'>11月</option>" +
                "<option value='12'>12月</option>");
            /*selectTime.append("<option value='09:00'>09:00</option><option value='10:00'>10:00</option>" +
             "<option value='11:00'>11:00</option><option value='12:00'>12:00</option><option value='13:00'>13:00</option>");
             */
            //插入元素
            selectYear.appendTo(calHeader);selectMonth.appendTo(calHeader);//selectTime.appendTo(calHeader);
            calHeader.appendTo(calDiv);
            calDiv.insertAfter($("body"));
            tableDiv = createCalendar(year,month);
            tableDiv.appendTo(calDiv);
            $("body").append(calDiv);
        }
        //自动生成日历
        function createCalendar(year,month){
            var now_days = new Array(31,28+is_leap(year),31,30,31,30,31,30,31,30,31,30);
            var newDate = new Date(year,month,1);
            var firstDay = newDate.getDay();
            var tr_str = Math.ceil((now_days[month]+firstDay)/7);//日历行数*/
            var tableDiv = $("<div class='calendarTable'/>");
            var table_append = $("<table cellspacing='0' border='0'/>");
            table_append.append("<tr align='center'><td>周日</td><td>周一</td><td>周二</td><td>周三</td><td>周四</td><td>周五" +
                "</td><td>周六</td></tr>");
            for(var i=0;i<tr_str;i++){
                var tr_append = $("<tr align='center' class='tr_time'/>");
                for(var j=0;j<7;j++){
                    idx = i*7+j;
                    date_str = idx-firstDay+1;
                    (date_str<=0||date_str>now_days[month])?date_str = "&nbsp;":date_str = idx-firstDay+1;
                    (date_str == dnow && month == mnow && year == ynow)?tr_append.append("<td bgcolor='yellow'>"+
                        date_str+"</td>"):tr_append.append("<td>"+date_str+"</td>");
                }
                tr_append.appendTo(table_append);
            }
            table_append.appendTo(tableDiv);
            return tableDiv;
        }



    }



})