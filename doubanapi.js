angular.module('doubanModule', []).factory('doubanapi', ['$http',
	function($http){
		var dbapi = 'http://api.douban.com/v2/movie/search?q=';
		var searchapi = function(search_for, onsuccess){
			var res = [];
			$http.get('/test.txt').success(function(data){
				var sbjs = data.subjects;
				for(var i = 0; i < sbjs.length; i++){
					var result = {};
					result.title = sbjs[i].title;
					result.year = sbjs[i].year;
					result.rating = sbjs[i].rating.average;
					result.image = sbjs[i].images.small;
					//result.image = '#';
					result.directors = '';
					var ds = sbjs[i].directors;
					for(var j = 0; j < ds.length; j++){
						result.directors += (ds[j].name + ' ');
					}
					result.actors = '';
					var as = sbjs[i].casts;
					for(var j = 0; j < as.length; j++){
						result.actors += (as[j].name + ' ');
					}
					res.push(result);
				}
				onsuccess(res);
			});
		};
		return {
			search: searchapi
		}
	}
]);
