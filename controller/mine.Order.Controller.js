/**
 * Created by Administrator on 2016/12/5.
 */
app.controller('ctrl', function($scope){
	MineOrderCtrl.init($scope);
});

var MineOrderCtrl = {
	scope: null,
	swiper: null,
	
	init: function($scope){
		this.scope = $scope;

        this.initData();

        this.swiperInit();

        this.bindClick();
		
		
	},

    //初始化tab数组
    initData: function(){
        this.scope.mimeOrderTabArr = mimeOrderTabArr;
    },

    swiperInit : function()
    {
        var self = this;

        this.swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            onSlideNextStart : function(swiper)
            {
                self.changeTabStyle(swiper.activeIndex);
            },
            onSlidePrevStart : function(swiper)
            {
                self.changeTabStyle(swiper.activeIndex);
            }

        });
    },

    bindClick : function()
    {
        var self = this;

        self.scope.tabItemClick = function(index)
        {
            self.swiper.slideTo(index);
            self.changeTabStyle(index);
        }
    },

    changeTabStyle : function(index){
        var cq =  100 * index + "%";
        $(".tab-line").css({'-webkit-transform':'translateX('+cq+')'});
        $(".tab-item").removeClass("active").eq(index).addClass('active');
    }
};
