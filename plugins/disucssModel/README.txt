这是一个评论区的模块插件，使用方法很简单，比如 ele.createDiscussMode();
插件的配置项有defaults = {
            header:"评论区",
            textAreaRows:5,
            textAreaCols:45,
            placeholderText:"客官对小女子有何感想？",
            buttonText:"发表",
            ele:$this,
            disWidth:"1200px",
            sendDataUrl:'../php/ljc-discuss.php',//把留言信息插入数据库
            getDataUrl:'../php/ljc-discuss-data.php',//根据留言数据库的数据加载对应的留言回复数据
            getAnswerDataUrl:'../php/answerData.php',//把留言回复信息插入数据库
            reg:/\d{12}/,//当前文件名匹配正则

        };
更改配置项就可以这么写 ele.createDiscussMode({
header:'XXXXXX'
})
