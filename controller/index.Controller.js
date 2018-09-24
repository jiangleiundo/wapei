/**
 * Created by Administrator on 2016/12/2.
 */

app.controller('ctrl', function($scope){

    initMN(function(){
        IndexCtrl.init($scope);
    });
});

var IndexCtrl = {
    scope: null,

    indexModel: {
        bannerArr: []
    },

    init: function($scope) {
        this.scope = $scope;

        this.scope.indexModel = this.indexModel;
        this.initData();

        this.bindClick();

        this.ngRepeatFinish();

        this.getBanner();


    },

    //初始化数组model
    initData: function(){
        var self = this;

        self.scope.indexGoodsSelArr = indexGoodsSelArr;
    },

    //绑定事件
    bindClick: function(){
        var self = this;

        //最新产品-切换模块
        self.scope.switchParts = function(index){
            $(".goods-option > div").removeClass("active").eq(index).addClass('active');
        };

        //
        self.scope.bannerLinkTo = function(item){
            if(item.linkType == 1) //跳转URL
            {
                var baseParam = {
                    "url" : URL_CLASSIFY_DETAIL,
                    "isHideNavBar" : 0,
                    "titleType" : 0
                };

                var leftParam = [{
                    "leftType" : 0,
                    "type" : 1 ,
                    "param" : "btn_back"
                }];

                var centerParam = [{"type" : 0,"param" : "产品详细"}];
                var rightParam = [{"type":0,"param":"搜索"}];

                mnWebMain.openWebViewController(baseParam,leftParam,centerParam,rightParam);
                
            }
            else if(item.linkType == 0) //跳转商品页（还不确定12.7）
            {
                mnWebMain.showToast("www.smartisan.com")
            }
        };

    },

    //ng-repeat 循环完成的回调函数
    ngRepeatFinish : function()
    {
        var self = this;

        self.scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                autoplay: 3000,
                autoplayDisableOnInteraction: false
            });
        });
    },

    //获取banner
    getBanner: function(){
        var self = this;
        var params = {
            position: 0
        };
        $service.httpRequest(0,'post',API_GET_BANNERS,params,


        /**
         * 首页轮播图
         * @param data.banners 数组
         * @param data.banners.image 图片URL
         * @param data.banners.linkType banner跳转类型0没有操作，1跳转URL，2跳转商品详情
         */
        function(data){

            self.indexModel.bannerArr = data.banners;
            self.scope.$apply();
        },
        function(){})
    }

};