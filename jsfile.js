var movieKong = angular.module('MovieKong', ['ngAnimate', 'doubanModule', 'youtubeModule']);
movieKong.controller('AppController', ['$scope', 'doubanapi', 'youtubeapi',
	function($scope, doubanapi, youtubeapi){
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

                youtubeapi.searchMore(query, function(data){
                    alert(Object.keys(data));
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
