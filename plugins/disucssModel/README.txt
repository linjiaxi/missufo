����һ����������ģ������ʹ�÷����ܼ򵥣����� ele.createDiscussMode();
�������������defaults = {
            header:"������",
            textAreaRows:5,
            textAreaCols:45,
            placeholderText:"�͹ٶ�СŮ���кθ��룿",
            buttonText:"����",
            ele:$this,
            disWidth:"1200px",
            sendDataUrl:'../php/ljc-discuss.php',//��������Ϣ�������ݿ�
            getDataUrl:'../php/ljc-discuss-data.php',//�����������ݿ�����ݼ��ض�Ӧ�����Իظ�����
            getAnswerDataUrl:'../php/answerData.php',//�����Իظ���Ϣ�������ݿ�
            reg:/\d{12}/,//��ǰ�ļ���ƥ������

        };
����������Ϳ�����ôд ele.createDiscussMode({
header:'XXXXXX'
})
