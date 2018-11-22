/* common
/* ==========================================================================
 * 工具类方法
 * 以 "_" 开始
 * ==========================================================================
 */

var utility = {

	/**
	 * 解析时间戳
	 * @param {Object} timestamp 时间搓
	 * @param {Object} onlyDate 日期 ： true 日期 + 时分秒 false
	 */
	formatDate : function(timestamp, onlyDate)
	{
		var date = new Date(timestamp * 1000);
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();

		if (onlyDate)
		{
			return this.numberPrefix(4, year) + "-" + this.numberPrefix(2, month) + "-" + this.numberPrefix(2, day);
		}

		return this.numberPrefix(4, year) + "-" + this.numberPrefix(2, month) + "-" + this.numberPrefix(2, day) + " "
			+ this.numberPrefix(2, hour) + ":" + this.numberPrefix(2, minute);
	},

	/**
	 * @param {Object} size
	 * @param {Object} num
	 */
	numberPrefix : function (size, num)
	{
		var sLen = ('' + num).length;
		if (sLen >= size) 
		{
			return '' + num;
		}
		var preZero = (new Array(size)).join('0');

		return preZero.substring(0, size - sLen) + num;
	},

	/**
	 * 解析URL传参
	 * @param {Object} key
	 */
	getQueryString : function(key)
	{
	    var after = window.location.search;
		if(after.indexOf(key) == -1) return null; //如果url中没有"key"直接返回空

		//先通过search取值如果取不到就通过hash来取
		after = after.substr(1) || window.location.hash.split("?")[1];
		if(after)
		{
			var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
			var r = after.match(reg);
			if(r != null)
			{
				return  decodeURIComponent(r[2]);
			}
			else
			{
				return null;
			}
		}
	},

	/**
	 * 根据唯一KEY值获取obj数组的下标
	 * @param {Object} arr
	 * @param {Object} key
	 * @param {Object} value
	 */
	getObjArrIndexById : function(arr, key, value){
		for(var i = 0 ; i < arr.length ; i ++)
		{
			if(arr[i][key] == value)
			{
				return i;
			}
		}
	},

	/**
	 * 判断是否为空
	 * @param {Object} str
	 */
    isEmpty : function(str)
    {
    	var retValue = false;

    	try
    	{
    		if(!str || str == "''" || str == "null" || str == "{}"
    		|| str == "[]" || str == "'[]'" || str == "<null>" || str == "0")
    		{
    			retValue = true;
    		}
    		else
    		{
    			retValue = false;
    		}
    	}
    	catch(e)
    	{
    		retValue = false;
    	}

		return retValue;
	},

    /**
     * 处理服务器返回数据是否为空，是取默认，否则取服务器的数据
     * @param {Object} apiValue
     * @param {Object} defaultValue
     */
    getDefaultOrSelf : function(apiValue, defaultValue)
    {
    	if(_utility.isEmpty(apiValue))
    	{
    		return defaultValue;
    	}
    	else
    	{
    		return apiValue;
    	}
    },

    /**
     * 根据数组对象的属性来排序
     * @param {Object} propertyName
     * @param {Object} targetArr
     */
    createComparionFun : function (propertyName, targetArr)
    {
		return function(object1, object2)
		{
			var value1 = object1[propertyName];
			var value2 = object2[propertyName];
			return value1 - value2 || targetArr.indexOf(object1) - targetArr.indexOf(object2);
		}
	},

	/**
	 * 深拷贝
	 * @param {Object} obj
	 */
	deepCopy : function(obj)
	{
	    var str, newobj = obj.constructor === Array ? [] : {};
	    if(typeof obj !== 'object')
	    {
	        return;
	    }
	    else if(window.JSON)
	    {
	        str = JSON.stringify(obj); //系列化对象
	        newobj = JSON.parse(str); //还原
	    }
	    else
	    {
	        for(var i in obj){
                if(obj.hasOwnProperty(i))
                {
                    newobj[i] = typeof obj[i] === 'object' ?
                        cloneObj(obj[i]) : obj[i];
                }
	        }
	    }
	    return newobj;
	},

	/**
	 * 判断表单是否为空
	 * @param {Object} dataArr
	 */
	noEmpty : function(dataArr){
		var bool = true;
		for(var i = 0;i < dataArr.length;i++){
			if(dataArr[i].data == ""||dataArr[i].data == null){
				mnWebMain.showToast(dataArr[i].errDesc);
				bool = false;
				break;
			}
		}
		return bool;
	},

	/**
	 * 判断手机号是否正确
	 * @param {Object} phone
	 */
	judgePhone : function(phone){
		if(phone && /^1[3|4|5|8|7]\d{9}$/.test(phone)){
			return true;
		}
		else
		{
			mnWebMain.showToast("手机号码格式不正确!");
			return false;
		}
	},

    /**
     * 判断连个值是否相等
     * @param data1
     * @param data2
     * @param desc
     * @returns {boolean}
     */
	isSame : function(data1,data2,desc){
		if(data1 != data2)
		{
			if(desc == "" || desc == undefined)
			{
				return false;
			}
			else
			{
				mnWebMain.showToast(desc);
				return;
			}
		}
		return true;
	}
};

/**
 * 公用
 */
document.body.addEventListener('touchstart', function () {
	//do noting
});