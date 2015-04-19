angular.module('doubanModule', []).factory('doubanapi', ['$http',
	function($http){
        var api = createapi();
        var douban = 'http://api.douban.com/v2/movie/';
        var search_more_service = api.createService(douban + 'search?{q,tag,start,count}');
        var serach_one_service = api.createService(douban + 'subject/{id}');

		var search_more = function(search_for, onsuccess){
			//var url = searchapi + encodeURIComponent(search_for);
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
        }
		var test = function(){
			count++;
			alert(count);
		};
		return {
			searchMore: search_more,
			searchOne: search_one,
			test: test
		}
	}
]);
