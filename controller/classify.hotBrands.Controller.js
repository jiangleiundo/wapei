/**
 * Created by Administrator on 2016/12/7.
 */
app.controller('ctrl', function($scope){
    initMN(function(){
        HotBrandsCtrl.init($scope);
    })
});

var HotBrandsCtrl = {
    scope: null,

    init: function($scope){
        this.scope = $scope;

        this.ngRepeatFinish();

    },

    ngRepeatFinish: function(){
        var self = this;

        self.scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent){

        })
    }
};