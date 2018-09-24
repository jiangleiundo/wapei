/**
 * controller
 * ============================================
 * 
 * ============================================
 */

app.controller('ctrl',function($scope){
	initMN(function(){
		GuidePageController.init($scope);
	})
	
});

var GuidePageController = {
	
	//全局变量
	scope : null,
	
	//数据模型
	
	
	/**
	 * 初始化
	 * @param {Object} $scope
	 */
	init : function($scope){
		
		this.scope = $scope;
		
		this.swiperInit();
		
		this.onClickFunction();
		
		this.ngRepeatFinish();
	},
	
	/*
	 * 点击事件
	 */
	onClickFunction : function(){
		
		var self = this;
		
		this.scope.useNow = function(){
			mnWebMain.syncSetLocalStorage(K_EX_ISNEW_USER,OLDUSER)
			self.jumpToLogin();
		}
	},
	
	//跳转登录页面
	jumpToLogin : function(){
		var baseParam = {
			"url" : URL_LOGIN,
			"isHideNavBar" : 1, 
			"titleType" : 0,
		};
		mnWebMain.closeSelfViewController(false);
		mnWebMain.openWebViewController(baseParam,[],[],[]);
	},
	
	
	/**
	 * ng-repeat 循环完成的回调函数
	 */
	ngRepeatFinish : function()
	{
		var self = this;
		
		this.scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
			
		});
	},
	
	/*
	 * 初始化swiper
	 */
    swiperInit : function()
    {
        var self = this;

        var swiper = new Swiper('.swiper-container', {
        	resistanceRatio : 0
        });
    },
	
}
