angular.module('doubanModule', []).factory('doubanapi', ['$http',
	function($http){
		var count = 0;
        var doubanapi = createapi.create('duban', 'http://api.douban.com/v2');
        doubanapi.add_method('search_more', '/movie/search').add_request_tags(['q','tag','start','count']);
        doubanapi.add_method('search_one', '/movie/subject/{id}');
        doubanapi.set_send_delegate($http);
		var search_more = function(search_for, onsuccess){
			var url = searchapi + encodeURIComponent(search_for);
            doubanapi.get_method('search_more').q(search_for).send((function(data){
				onsuccess(res.subjects);
			});
		};

        var search_one = function(search_for, success){
            doubanapi.get_method('search_one').id(search_for).send(function(response){
            });
        }
		var test = function(){
			count++;
			alert(count);
		};
		return {
			search_more: searchSubjects,
			search_one: getSubject,
			test: test
		}
	}
]);
