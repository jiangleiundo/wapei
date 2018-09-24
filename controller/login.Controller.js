/**
 * Created by Administrator on 2016/12/1.
 */

app.controller('ctrl',function($scope){
	
	initMN(function(){
		LoginController.init($scope);
	})
});

var LoginController = {

    //全局变量
    scope : null,
    swiper : null,
    
    /*
     * 数据模型
     */
    dataModel : {
    	accountLogin : {
    		accountName : "",
    		accountPwd : "",
    	},
    	mobileLogin : {
    		loginMobilePhone : "",
    		loginMobileCode : "",
    	},
    	accountRegister : {
    		registerMobilePhone : "",
    		registerMobileCode : "",
    		registerPwd : "",
    		confirmPwd : "",
    	},
    	forgetPwd : {
    		forgetMobilePhone : "",
    		forgetMobileCode : "",
    		forgetPwd : "",
    		confirmPwd : "",
    	},
    },

    init : function($scope)
    {
        this.scope = $scope;
        
        this.dataModelInit();

        this.swiperInit();

        this.bindClick();
        
        this.ngRepeatFinish();
    },

    /**
     * 数据模型初始化
     */
    dataModelInit : function()
    {
    	this.scope.dataModel = this.dataModel;
    	this.scope.$apply();
    },

	/*
	 * 点击事件
	 */
    bindClick : function()
    {
        var self = this;

        //切换tab登录方式
        self.scope.tabItemClick = function(index)
        {
            self.swiper.slideTo(index);
            self.changeTabStyle(index);
        };

        //去登陆
        self.scope.toLogin = function(){
           self.loginStatu();
        };

        //去注册
        self.scope.toRegister = function(){
            self.RegisterStatu();
        }
        
        //忘记密码
         self.scope.toForget = function(){
            self.ForgetStatu();
        }
        
        //获取验证码
        this.scope.getCode = function(phoneNumber,type){
        	self.getMsgCode(phoneNumber,type);
        }
        
        //登录
        this.scope.login = function(platform,platformId,password){
        	
        	var dataArr = [{'data':platformId,'errDesc':ERR_LOGININFO_BLANK},{'data':password,'errDesc':ERR_LOGININFO_BLANK}];
        	
        	if(utility.noEmpty(dataArr))
        	{
        		self.accountLogin(platform,platformId,password)
        	}
        }
        
        this.scope.qqLogin = function(){
        	var A=window.open("oauth/index.php","TencentLogin", "width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
        }
        
        //注册
        this.scope.register = function(){
        	var dataArr = [ {'data':self.dataModel.accountRegister.registerMobilePhone,'errDesc':ERR_MOBILEPHONE_BLANK},
        					{'data':self.dataModel.accountRegister.registerMobileCode,'errDesc':ERR_CODE_BLANK},
        					{'data':self.dataModel.accountRegister.registerPwd,'errDesc':ERR_PWD_BLANK}
        				];
			if(utility.judgePhone(self.dataModel.accountRegister.registerMobilePhone))
    		{
    			if(utility.noEmpty(dataArr))
				{
					if(utility.isSame(self.dataModel.accountRegister.registerPwd,self.dataModel.accountRegister.confirmPwd,ERR_CONFIRMPWD_DIFFERENCE))
					{
						var params = {};
						params.platformId = self.dataModel.accountRegister.registerMobilePhone;
						params.password = self.dataModel.accountRegister.registerPwd;
						params.verifyCode = self.dataModel.accountRegister.registerMobileCode;
						
						$service.httpRequest(0,"post",API_REGISTER,params,function(data){
							mnWebMain.showToast(REGISTER_SUCCESS);
							self.loginCallBack();
						})
					}
				}
    		}
        }
        
        //忘记密码
        this.scope.forgetSubmit = function(){
        	var dataArr = [ {'data':self.dataModel.forgetPwd.forgetMobilePhone,'errDesc':ERR_MOBILEPHONE_BLANK},
        					{'data':self.dataModel.forgetPwd.forgetMobileCode,'errDesc':ERR_CODE_BLANK},
        					{'data':self.dataModel.forgetPwd.forgetPwd,'errDesc':ERR_PWD_BLANK}
        				];
        				
			if(utility.judgePhone(self.dataModel.forgetPwd.forgetMobilePhone))
    		{
    			if(utility.noEmpty(dataArr))
				{
					if(utility.isSame(self.dataModel.forgetPwd.forgetPwd,self.dataModel.forgetPwd.confirmPwd,ERR_CONFIRMPWD_DIFFERENCE))
					{
						var params = {};
						params.platformId = self.dataModel.forgetPwd.forgetMobilePhone;
						params.password = self.dataModel.forgetPwd.forgetPwd;
						params.verifyCode = self.dataModel.forgetPwd.forgetMobileCode;
						
						$service.httpRequest(0,"post",API_CHANGEPWD,params,function(data){
							self.loginStatu();
							mnWebMain.showToast(CHANGE_PWD_SUCCESS);
						})
					}
				}
    		}
        }
    },
    
    
    /*
     * 账号登录
     * platform（平台类型 1自有账号 2微信 3QQ 4微博 5手机验证码）
     * platformId（当前平台的唯一标识），
     * userType：1为普通用户，2为管理员
     */
    accountLogin : function(platform,platformId,password){
    	
    	var self = this;
    	
    	var params = {};
    	params.userType = 1;
    	params.platform = platform;
    	params.platformId = platformId;
    	params.password = password;
    	
    	$service.httpRequest(0,"post",API_LOGIN,params,function(data){
    		self.loginCallBack(data)
    	})
    },
    
    /*
     * loginCallback
     */
    loginCallBack : function(data){
    	
    	mnWebMain.syncSetLocalStorage(K_EX_LOGIN_STATUS,HASLOGIN);
		mnWebMain.syncSetLocalStorage(K_EX_TOKEN,data.token);
		mnWebMain.syncSetLocalStorage(K_EX_SESSIONID,data.sessionId);
		mnWebMain.syncSetLocalStorage(K_EX_USER_INFO,JSON.stringify(data.userInfo));
		mnWebMain.closeSelfViewController(false);
		mnWebMain.openViewController('ui-index');
    },
    
    
    /*
     * 获取短信验证码
     * type(1 注册 2 登录 3 修改密码)
     */
    getMsgCode : function(phoneNumber,type){
    	var self = this;
    	if(!utility.isEmpty(phoneNumber))
    	{
    		if(utility.judgePhone(phoneNumber))
	    	{
	    		var params = {};
	    		params.mobile = phoneNumber;
	    		params.type = type;
	    		
	    		$service.httpRequest(0,"post",API_GET_CODE,params,function(data){
	    			mnWebMain.showToast(GET_CODE_SUCCESS);
	    		})
	    	}
    	}
    	else
    	{
    		mnWebMain.showToast(ERR_MOBILEPHONE_BLANK);
    	}
    	
    },
    

    /**
     * 改变tab样式
     */
    changeTabStyle : function(index){
        $(".tab-item").removeClass("active").eq(index).addClass('active');
    },
    
    /*
     * 登录状态
     */
    loginStatu : function(){
        $("#register").addClass("hidden");
        $("#forgetPwd").addClass("hidden");
        $("#login").removeClass("hidden");
    },
    
     /*
     * 注册状态
     */
    RegisterStatu : function(){
	 	$("#login").addClass("hidden");
        $("#forgetPwd").addClass("hidden");
        $("#register").removeClass("hidden");
    },
    
     /*
     * 忘记密码状态
     */
    ForgetStatu : function(){
    	$("#login").addClass("hidden");
        $("#register").addClass("hidden");
        $("#forgetPwd").removeClass("hidden");
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

        this.swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            onSlideNextStart: function(swiper) {
                self.changeTabStyle(swiper.activeIndex);
            },
            onSlidePrevStart: function(swiper) {
                self.changeTabStyle(swiper.activeIndex);
            }
        });
    },

};

