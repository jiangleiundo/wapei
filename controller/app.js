/**
 * Created by Administrator on 2016/12/2.
 */
var app = angular.module("app",[]).run(function(){FastClick.attach(document.body)});

//repeat
app.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});