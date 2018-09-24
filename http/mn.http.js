/* ajax
/* ==========================================================================
 * 封装Ajax
 * make by liangyong
 * ============================================================================
 */

var $service = {

	/**
	 * 封装Ajax
	 * @param {Object} dataType// 0:不待err值 1:带err值
	 * @param {Object} type //"post" or "get"
	 * @param {Object} dataApi //api地址
	 * @param {Object} params //参数
	 * @param {Object} callBack //成功回调
	 * @param {Object} errCallBack //失败回调，可不传
	 */

	httpRequest : function(dataType, type, dataApi, params, callBack, errCallBack)
	{
	    $.ajax({
	        url: dataApi,
	        async:true,
	        type: type,
	        data: params,
	        dataType:"json",
	        success: function(data){
	        	var err = data.err;
	        	var errMsg = data.errMsg;

	        	if(err != 0)
	        	{
	        		if(err == 5)
	        		{
	        			//重登陆
	        		}
	        		else if(err == 102)
	        		{
	        			$service.reLogin();
	        		}
	        		else
	        		{
	        			mnWebMain.showToast(errMsg)
//	        			alert(errMsg);
	        		}
	        	}
	        	else
	        	{
	        		if(dataType == 0)
	        		{
	        			callBack(data["data"]);
	        		}
	        		else
	        		{
	        			callBack(data);
	        		}
	        	}

		    },
			error: function (data) {
				if(errCallBack)
				{
					errCallBack(data)
				}
			}
	    });
	},
	
	reLogin : function(){
		var baseParam = {
			"url" : URL_LOGIN,
			"isHideNavBar" : 1, 
			"titleType" : 0,
		};
		mnWebMain.closeSelfViewController(false);
		mnWebMain.openWebViewController(baseParam,[],[],[]);
	}
};


