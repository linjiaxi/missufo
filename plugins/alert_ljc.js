

define(['jquery'],function($){
    function alert(data){
        var alertDiv = $("<div class='alertDiv'>"),
            headerH1 = $("<h1 class='alertH1'>"),//头部消息
            mainDiv = $("<div class='alertMain'>"),
            clickBtn = $("<button class='clickBtn'>"),
            maskDiv = $("<div class='maskDiv'>"),//遮罩层
            defaultData = {
                width:"300px",
                height:"auto",
                message:"",
                title:"系统消息",
                btnMessage:"确定"
            },
            data = $.extend({},defaultData,data);

        headerH1.html(data.title);
        mainDiv.html(data.message);
        clickBtn.html(data.btnMessage);
        alertDiv.append(headerH1).append(mainDiv).append(clickBtn);
        $("body").append(maskDiv).append(alertDiv);
        alertDiv.css({
            width:data.width,
            height:data.height,
            position:"absolute",
            left:"50%",
            marginLeft:-parseInt(data.width)/2+"px",
            top:"50%",
            marginTop:-alertDiv.height()/2+"px",
            zIndex:1000
        })
        //点击确定按钮，弹窗消失
        $(".clickBtn").click(function(){

            $(".alertDiv").remove();
            $(".maskDiv").remove();
        })
    }

    return {
        alert:alert
    }
})
