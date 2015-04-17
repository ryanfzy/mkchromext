var onsuccess = function(data){
};

var movieKong = angular.module('MovieKong', ['doubanModule']);
movieKong.controller('AppController', ['$scope', 'doubanapi',
	function($scope, doubanapi){
		$scope.getResult = function(query){
			doubanapi.searchMore(query, function(results){
                forEach(results, function(result){
                    var result = copy_ex(result, ['title', 'year', 'rating', 'image', 'directors', 'actors', 'alt', 'id']);
                    result.directors = result.director.join(' ');
                    result.actors = result.actors.join(' ');
                    results.push(result);
                }
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
