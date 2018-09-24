/**
 * controller
 * ============================================
 * 
 * ============================================
 */

// 2. 调用Controller
app.controller('ctrl',function($scope){
	initMN(function(){
		LoadingController.init($scope);
	})
	
});

var LoadingController = {
	
	//全局变量
	scope : null,
	timer : null,
	secTime : 3,
	
	//数据模型
	
	
	/**
	 * 初始化
	 * @param {Object} $scope
	 */
	init : function($scope){
		
		this.scope = $scope;
		
		this.setDefault();
		
		this.jumpToIndex();
		
		this.onClickFunction();
		
		this.ngRepeatFinish();
	},
	
	/*
	 */
	setDefault : function(){
		
		this.scope.secTime = this.secTime;
		this.scope.$apply();
	},
	
	//判断是否已登录
	isLogin : function(){
		var login_status = mnWebMain.syncGetLocalStorage(K_EX_LOGIN_STATUS);
		if(login_status == HASLOGIN)
		{
			this.reLogin()
		}
		else
		{
			var userStatu = mnWebMain.syncGetLocalStorage(K_EX_ISNEW_USER);
			
			if(userStatu == OLDUSER)
			{
				this.jumpToLogin()
			}
			else
			{
				this.jumpToGuidePage();
			}
		}
	},
	
	//loading完成之后跳转页面
	jumpToIndex : function(){
		var self = this;
		
		self.timer = setInterval(function(){
			self.secTime--;
			
			self.scope.secTime = self.secTime;
			self.scope.$apply();
			
			if(self.secTime == 1)
			{
				clearInterval(self.timer);
				self.isLogin();
				return;
			}
			
		},1000)
	},
	
	/*
	 * 跳转到引导页
	 */
	jumpToGuidePage : function(){
		var baseParam = {
			"url" : URL_GUIDEPAGE,
			"isHideNavBar" : 1, 
			"titleType" : 0,
		};
		mnWebMain.closeSelfViewController(false);
		mnWebMain.openWebViewController(baseParam,[],[],[]);
	},
	
	/*
	 * 重登录
	 */
	reLogin : function(){
		
		var params = {};
		params.userType = 1;
		params.token = mnWebMain.syncGetLocalStorage(K_EX_TOKEN);

//      setTimeout(function(){
            $service.httpRequest(0,"post",API_RELOGIN,params,function(data){
                mnWebMain.syncSetLocalStorage(K_EX_TOKEN,data.token);
                mnWebMain.closeSelfViewController(false);
                mnWebMain.openViewController("ui-index");
            },function(){
                self.jumpToLogin();
            })
//      },3000);
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
	
	/*
	 * 点击事件
	 */
	onClickFunction : function(){
		
		var self = this;
		
		this.scope.stopWait = function(){
			clearInterval(self.timer);
			self.isLogin();
		}
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
	
}
