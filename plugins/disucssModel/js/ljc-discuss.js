/**
 * Created by acer on 2016/6/1.
 */

$.fn.extend({
    createDiscussMode:function(data){
        var html,
            $this = $(this),
            publishBtn,ljc_discuss,
            textAreaContent,
            htmlName,
            reg1,
            htmlFullName;
        defaults = {
            header:"评论区",
            textAreaRows:5,
            textAreaCols:45,
            placeholderText:"客官对小女子有何感想？",
            buttonText:"发表",
            ele:$this,
            disWidth:"1200px",
            sendDataUrl:'../php/ljc-discuss.php',
            getDataUrl:'../php/ljc-discuss-data.php',
            getAnswerDataUrl:'../php/answerData.php',
            reg:/\d{12}/,//当前文件名匹配正则
        };

        //初始化变量
        data = $.extend({},defaults,data);
        console.log(data.getAnswerDataUrl);
        html = "";//动态加载的html
        ljc_discuss = $("<div id='ljc-discuss'></div>");
        html = "<h1>"+data.header+"</h1><hr><div id='ljc-discuss-main'>" +
            "<div id='ljc-publish'><textarea rows='"+data.textAreaRows+"' cols='"+data.textAreaCols+"' placeholder='"+
            data.placeholderText+"'></textarea>" +
            "<button class='ljc-publish-button'>"+data.buttonText+"</button></div>" +
            "</div>";

        ljc_discuss.html(html);
        data.ele.append(ljc_discuss);//添加评论区到页面
        $("#ljc-discuss").css({width:data.disWidth});
        //拿到当前页面路径，提取出文件名
        htmlFullName = window.location.pathname;
        reg1 = data.reg;
        //reg2 = /blog\/[jp]\w{7}/;
        htmlName = htmlFullName.match(reg1)[0];
        console.log(htmlName);
        //fileName = htmlFullName.match(reg2)[0];
        //fileName = fileName.slice(5);
        publishBtn = $(".ljc-publish-button");

        //点击发表按钮生成留言，同时把数据用ajax发送给后台，添加进数据库
        publishBtn.on("click",function(){

            //拿到当前页面的最高楼数，如果没有，则楼数为1
            var floors = $(".floors"),
                num;//当前最高楼数

            textAreaContent = $("textarea").val();

            if(floors.length){
                num = parseInt(floors.eq(floors.length-1).text())+1;
            }else{
                num = 1;
            }
            createDiscussEle(textAreaContent,num);
            //把数据存进数据库
            $.ajax({
                url:data.sendDataUrl,
                data:{
                    textAreaContent:textAreaContent,
                    htmlName:htmlName,
                    num:num
                },
                type:"post",
                success:function(data){
                    data == 1?alert("发表成功"):alert("发表失败");
                    location.reload();
                }
            })
        });



        //当刷新或加载页面时，发送ajax请求，把留言从数据库调出来，加载到页面
        (function(){
            var url = data.getAnswerDataUrl;
            $.ajax({
                url:data.getDataUrl,
                data:{
                    htmlName:htmlName
                },
                type:"post",
                dataType:"json",
                success:function(data){
                    console.log(data.getAnswerDataUrl);
                    if(data == "0") return;
                    $.each(data,function(i,n){
                        createDiscussEle(n[0],n[1]);
                        //加载每层楼的回复留言
                        var discuss_mode = $(".ljc-discussed-mode");
                        if(!n[2]){
                            return;
                        }else{
                            for(var j=0;j<n[2].length;j++){
                                createAnswerHtml(i,n[2][j]);
                            }
                        }
                    });
                    //当点击回复按钮区域，出现回复内容编辑框,再点击时就隐藏
                    var ansText = $(".ljc-discussed-answer");
                    var ansArea = $(".answerText");
                    ansText.each(function(index,ele){
                        $(this).click(function(){
                            ansArea.eq(index).toggle();
                        })
                    });

                    //点击回复框的回复按钮，把回复立即显示在页面，然后再把数据传送到后台
                    var ansBtn = $(".answerBtn");//回复按钮区域
                    ansBtn.each(function(index,ele){
                        $(this).click(function(){
                            var ansArea = $(".answerText").eq(index),
                                content = ansArea.find("textarea").val(),
                                discussID = ansArea.attr("data-id");
                            if(content){
                                console.log(url);
                                $.ajax({
                                    url:url,
                                    type:"post",
                                    data:{
                                        content:content,
                                        discussID:discussID,
                                        htmlName:htmlName
                                    },
                                    success:function(data){
                                        if(data == 1){
                                            alert("回复成功");
                                            createAnswerHtml(discussID-1,content);
                                            ansArea.css("display","none");//隐藏回复框
                                        }else{
                                            alert(data);
                                        }
                                    }
                                })
                            }else{
                                alert("内容不能为空");
                            }
                        })
                    })


                }
            })




        }());

        //生成留言插进页面的函数
        function createDiscussEle(textContent,num){
            var discussMode,discussedHtml;
            discussedHtml = "<span class='floors'>"+num+"楼</span><span class='ljc-discussed-one'>"
                +textContent+"</span><span class='ljc-discussed-answer'><img src='../images/love.png'>" +
                "<span>回复</span></span>" +
                "<div class='answerText' data-id="+num+"><textarea rows='4' cols='40'></textarea><button class='answerBtn'>回复</button></div>";
            discussMode = $("<div class='ljc-discussed-mode'></div>");
            discussMode.html(discussedHtml);
            $this.append(discussMode);
            discussMode.css("width",data.disWidth);
        }


        //生成回复留言函数
        function createAnswerHtml(index,content){
            var html = $("<div class='answerWords'>"),
                discuss_mode = $(".ljc-discussed-mode");
            html.html(content);
            discuss_mode.eq(index).append(html);
        }



    }
});