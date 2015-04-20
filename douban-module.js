angular.module('doubanModule', []).factory('doubanapi', ['$http',
	function($http){
        var api = createAPI();
        var douban = 'http://api.douban.com/v2/movie/';
        var search_more_service = api.createService(douban + 'search?{q,tag,count}');
        var serach_one_service = api.createService(douban + 'subject/{id}');

		var search_more = function(search_for, onsuccess){
			//var url = searchapi + encodeURIComponent(search_for);
            search_for = encodeURIComponent(search_for);
            var url = search_more_service.start().q(search_for).build();
            $http.get(url).success(function(data){
                onsuccess(data.subjects);
            });
		};

        var search_one = function(search_for, success){
            var url = search_one_service.start().id(search_for).
            $http.get(url).onsuccess(function(data){
                onsuccess(data);
            });
        };

		return {
			searchMore: search_more,
			searchOne: search_one
		}
	}
]);
