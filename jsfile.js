
var movieKong = angular.module('MovieKong', ['ngAnimate', 'doubanModule']);
movieKong.controller('AppController', ['$scope', 'doubanapi',
	function($scope, doubanapi){
        var cssForSearchBoxInit = 'search-box-init';
        var cssForSearchBoxImageInit = 'image-before-search';

        $scope.className = cssForSearchBoxInit;
        $scope.imageClass = cssForSearchBoxImageInit;

		$scope.getResult = function(query){
            $scope.className = cssForSearchBoxInit + ' search-box-searching';
            $scope.imageClass = 'image-searching';

            $scope.results = [];
			doubanapi.searchMore(query, function(results){
                forEach(results, function(r){
                    var result = copy_ex(r, {
                        year : 'year',
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
                $scope.className = cssForSearchBoxInit;
                $scope.imageClass = cssForSearchBoxImageInit;
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
