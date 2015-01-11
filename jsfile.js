
var movieKong = angular.module('MovieKong', ['doubanModule']);
movieKong.controller('AppController', ['$scope', 'doubanapi',
	function($scope, doubanapi){
		$scope.getResult = function getResult(query){
			doubanapi.search(query, function(res){
				$scope.results = res;
			})
		};
		$scope.getPage = function(link){
			chrome.tabs.create({url:link});
		};
	}
])
.directive('mkTab', function(){
	return {
		templateUrl: 'mk-search.html'
	};
});
