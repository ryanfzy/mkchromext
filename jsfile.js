
var movieKong = angular.module('MovieKong', ['doubanModule']);
movieKong.controller('SearchController', ['$scope', 'doubanapi',
	function($scope, doubanapi){
		$scope.getResult = function getResult(query){
			doubanapi.search(query, function(res){
				$scope.results = res;
			})
		};
	}
]);
