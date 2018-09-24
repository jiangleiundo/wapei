/**
 * controller
 * ============================================
 * 
 * ============================================
 */

// 2. 调用Controller
app.controller('ctrl',function($scope){
	initMN(function(){
		GoodsDetailController.init($scope);
	})
	
});

var GoodsDetailController = {
	
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
	 * swiper初始化
	 */
	swiperInit : function(){
		
		var self = this;
		
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 3000,
            autoplayDisableOnInteraction: false
        });
	},
	
}
