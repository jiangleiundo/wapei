/* common
/* ==========================================================================
 * loading
 * 封装预加载动画
 * make by liangyong
 * 以 "$" 开始
 * ============================================================================ 
 */ 

var $Loading = {
	
	start : function(){
		
		var loading = '';
		
		loading += '<div class="loading">';
		loading += '   <div class="ub">';
		loading += '   <div class="ub-f1 loading-lf"><div class="loader"></div></div>';
		loading += '   <div class="ub-f1 loading-txt"><span>加载中...</span></div>';
		loading += '   </div>';
		loading += '</div>';
		
		$(".emptyData").hide();
		$("body").append(loading);
	},
	
	end : function(){
		
		$(".loading").remove();
		$(".container").css("opacity","1");
	},
	
	empty : function(data){
		$(".emptyData").show();
		$(".loading").remove();
		$(".container").css("opacity","1");
	}
};

