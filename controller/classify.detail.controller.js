/**
 * Created by Administrator on 2016/12/6.
 */
app.controller('ctrl', function($scope){
    ClassifyDetailCtrl.init($scope);
});

var ClassifyDetailCtrl = {
    scope: null,

    classifyDetailModel: {

    },

    init: function($scope){
        this.scope = $scope;

        this.scope.classifyDetailModel = this.classifyDetailModel;

        this.ngRepeatFinish();

        this.initData();

        this.bindClick();
    },

    //初始化数组数据
    initData: function(){
        var self = this;
        self.scope.classifyTabArr = classifyTabArr;
    },

    //绑定事件
    bindClick: function(){
        var self = this;

        //切换分类详情模块
        self.scope.switchParts = function(index){
            $(".goods-option > div").removeClass("active").eq(index).addClass('active');
            $(".cd-container > div").removeClass("showIm").eq(index).addClass('showIm');
            $(".cd-container-bg").removeClass("hiddenIm")
        };

        //关闭分类详情层
        self.scope.closeMask = function(){
            $(".cd-container-bg").addClass("hiddenIm")
        };

        $(".cd-goods-lt > li").off().on("tap", function(){
            $(".cd-goods-lt > li").removeClass("active");
            $(this).addClass("active");
        })
    },

    //ngRepeat循环完成回调
    ngRepeatFinish: function(){
        var self = this;

        self.scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {

        });
    }
};