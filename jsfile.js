
var movieKong = angular.module('MovieKong', ['doubanModule']);
movieKong.controller('AppController', ['$scope', 'doubanapi',
	function($scope, doubanapi){
		$scope.getResult = function(query){
            $scope.results = [];
			doubanapi.searchMore(query, function(results){
                forEach(results, function(r){
                    var result = copy_ex(r, {
                        image : 'images.small',
                        title : 'title',
                        alt : 'alt',
                        rating : 'rating.average',
                        directors : '@directors.name',
                        actors : '@casts.name'
                    });
                    result.directors = result.directors.join(', ');
                    result.actors = result.actors.join(', ');
                    $scope.results.push(result);
                });
			});
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
