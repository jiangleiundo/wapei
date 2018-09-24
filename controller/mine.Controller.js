
app.controller('ctrl', function($scope){
	MineCtrl.init($scope);
});

var MineCtrl = {
	scope: null,
	
	init: function($scope){
		this.socpe = $scope;
		
		
	}
};
