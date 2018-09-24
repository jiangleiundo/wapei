/**
 * Created by Administrator on 2016/12/6.
 */
app.controller('ctrl', function($scope){

    initMN(function(){
        ClassifyCtrl.init($scope);
    })
});

var ClassifyCtrl = {
	scope: null,

    classifyModel: {
        startIndex: 0,
        brandNum: 10, //每次获取10个数据
        tagsNum: 10, //每次获取10个数据
        brands: [], //品牌列表
        tags: [] //标签列表
    },
	
	init: function($scope){
		this.scope = $scope;

        this.scope.classifyModel = this.classifyModel;

        this.ngRepeatFinish();

        this.getBrands();

        this.getTags();

        this.onEvent();
	},

	ngRepeatFinish: function(){
		var self = this;
		
		self.scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){
			
		})
	},

    //绑定事件
    onEvent: function(){
        var self = this;

        //查看更多机型品牌
        self.scope.seeMore = function(){
            var baseParam = {
                "url" : URL_HOT_BRANDS,
                "isHideNavBar" : 0,
                "titleType" : 0
            };

            var leftParam = [{
                "leftType" : 0,
                "type" : 1 ,
                "param" : "btn_back"
            }];

            var centerParam = [];
            var rightParam = [];

            mnWebMain.openWebViewController(baseParam,leftParam,centerParam,rightParam);
        }
    },

    //获取品牌
    getBrands: function(){
        var self = this,
            params = {
                startIndex: self.classifyModel.startIndex,
                num: self.classifyModel.brandNum,
                initial: ""
            };

        $service.httpRequest(0, "post", API_GET_BRANDS, params,

            /**
             * 配件品牌
             * @param data.brands 品牌列表
             * @param data.brand_name 品牌名
             * @param data.brand_icon 品牌icon
             */
            function(data){
                self.classifyModel.brands = data.brands;
                self.scope.$apply();
            },
            function(){}
        )
    },

    //获取标签
    getTags: function(){
        var self = this,
            params = {
                startIndex: self.classifyModel.startIndex,
                num: self.classifyModel.tagsNum,
                likeStr: ""
            };
        $service.httpRequest(0, "post", API_GET_TAGS, params,
            /**
             * 机型品牌
             * @param data.tags
             * @param data.tags.tag_name 机型名
             * @param data.tags.tag_icon 机型icon
             */
            function(data){
                self.classifyModel.tags = data.tags;
                self.scope.$apply();
            },
            function(){}
        )


    }
};
