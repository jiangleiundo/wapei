
//获取列表
var getListHttp = {
    startNum: 0,
    num: 10,
    searchParams: null,
    dataType: "0",
    type: 'post',
    dataApi: null,
    callback: null,


    setParams: function(startNum, num, dataType, type, dataApi, searchParams, callBack){
        var self = this;

        self.startNum = startNum;
        self.num = num;
        self.dataType = dataType;
        self.type = type;
        self.dataApi = dataApi;
        self.searchParams = searchParams;
        self.callback = callBack;

        self.getListCallback();
    },
    getListCallback: function(){
        var self = this,
            baseParams = {
            startIndex: self.startNum,
            num: self.num
        };
        var params = $.extend(baseParams, this.searchParams);
        $service.httpRequest(self.dataType, self.type, self.dataApi, params, self.callback, function(){});
    }
};