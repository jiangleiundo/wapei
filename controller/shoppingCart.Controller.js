/**
 * Created by Administrator on 2016/12/4.
 */

app.controller('ctrl', function($scope){
    initMN(function(){
    	ShoppingCartCtrl.init($scope);
    })
});

var ShoppingCartCtrl = {
    scope: null,

    shoppingModel: {
        modelArr: [],
        item: 1
    },

    init: function($scope){
    	
        this.scope = $scope;
        
        $Loading.start();
        
        this.setDefault();

        this.bindClick();

    },
    
    setDefault : function(){
    	
    	var self = this;
    	this.scope.shoppingModel = this.shoppingModel;
    	this.scope.$apply();
    	
    	$Loading.end();
    },

	/*
	 * 按钮点击事件
	 */
    bindClick: function(){
        var self = this;

        //减少数量
        self.scope.minus = function($event){
        	$event.stopPropagation()
            if(self.shoppingModel.item > 1)
            {
                self.shoppingModel.item --;
            }
        };

        //增加数量
        self.scope.plus = function($event){
        	$event.stopPropagation()
            self.shoppingModel.item ++;
        }
        
        self.scope.openUrlInApp = function(){
        	mnWebMain.openUrlInApp("ttt","https://www.baidu.com/index.php?tn=22073068_2_dg")
        }
        
        //跳转到产品详情
        this.scope.toGoodsDetail = function(){
        	var baseParam = {
				"url" : URL_GOODS_DETAIL,
				"isHideNavBar" : 0, 
				"titleType" : 0,
			};
			var centerParam = [{"type" : 0,"param" : "商品详情"}];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
			mnWebMain.openWebViewController(baseParam,leftParam,centerParam,[]);
        }


    }
};
