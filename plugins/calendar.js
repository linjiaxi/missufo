/**
 * Created by acer on 2016/5/30.
 */
$.fn.extend({
    createCalendar:function(data){

        //�������
        var $this = $(this),
            nowDate = new Date(),
            ynow = nowDate.getFullYear(),
            mnow = nowDate.getMonth(),
            dnow = nowDate.getDate(),
            data = data || {},
            calendarE,//��������
            calendarT,//�����������ڶ���
            calendarH,//����ͷ��
            calendarSelect,//������Ԫ��
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



        createHeader(ynow,mnow);//��������������body
        //������ʼ��
        calendarE = $(".calendar");
        calendarT = $(".calendarTable");
        calendarH = $(".calendarHeader");
        calendarSelect = calendarH.find("select");
        //��ʼ��������ʽ
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

        //�ж�������������ǰٷֱȻ�������
        if(data.width.indexOf("%")>0){
            //�õ��豸�Ŀ��
            var winWidth = $(window).width(),
                calendarWidth = winWidth*parseInt(data.width)/100;//calendar���

            //������ʽ
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

        //����������ѡ���¼�
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

        //��껮����td��ɫ
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
            //�����Ӧ�����������Ӧ������
            $(this).click(function(){
                var selectY = $(".selectY").val(),
                    selectM = $(".selectM").val(),
                    date = $(this).html();

                $this.val(selectY+"/"+selectM+"/"+date);
                calendarE.css("display","none");
            })
        });





        //�ж��Ƿ�Ϊ����
        function is_leap(year){
            return (year%100 == 0?res = (year%400 == 0?1:0):res = (year%4 == 0?1:0));
        }
        function createHeader(year,month){
            var calDiv = $("<div class='calendar'/>"),
                calHeader = $("<div class='calendarHeader' align='center'>"),
                tableDiv,//����������Ҫ����
                selectYear = $("<select class='selectY'/>"),
                selectMonth = $("<select class='selectM'/>"),
                selectTime = $("<select class='selectT'/>");
            selectYear.append("<option value='2016'>2016</option><option value='2017'>2017</option>" +
                "<option value='2018'>2018</option><option value='2018'>2019</option><option value='2018'>2020</option>");
            selectMonth.append("<option value='1'>1��</option><option value='2'>2��</option>" +
                "<option value='3'>3��</option><option value='4'>4��</option><option value='5'>5��</option>" +
                "<option value='6'>6��</option><option value='7'>7��</option><option value='8'>8��</option>" +
                "<option value='9'>9��</option><option value='10'>10��</option><option value='11'>11��</option>" +
                "<option value='12'>12��</option>");
            /*selectTime.append("<option value='09:00'>09:00</option><option value='10:00'>10:00</option>" +
                "<option value='11:00'>11:00</option><option value='12:00'>12:00</option><option value='13:00'>13:00</option>");
*/
            //����Ԫ��
            selectYear.appendTo(calHeader);selectMonth.appendTo(calHeader);//selectTime.appendTo(calHeader);
            calHeader.appendTo(calDiv);
            calDiv.insertAfter($("body"));
            tableDiv = createCalendar(year,month);
            tableDiv.appendTo(calDiv);
            $("body").append(calDiv);
        }
        //�Զ���������
        function createCalendar(year,month){
            var now_days = new Array(31,28+is_leap(year),31,30,31,30,31,30,31,30,31,30);
            var newDate = new Date(year,month,1);
            var firstDay = newDate.getDay();
            var tr_str = Math.ceil((now_days[month]+firstDay)/7);//��������*/
            var tableDiv = $("<div class='calendarTable'/>");
            var table_append = $("<table cellspacing='0' border='0'/>");
            table_append.append("<tr align='center'><td>����</td><td>��һ</td><td>�ܶ�</td><td>����</td><td>����</td><td>����" +
                "</td><td>����</td></tr>");
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