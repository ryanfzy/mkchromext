angular.module('doubanModule', []).factory('doubanapi', ['$http',
	function($http){
		var count = 0;
		var dburl = 'https://api.douban.com';
		var searchapi = dburl + '/v2/movie/search?q=';
		var subjectapi = dburl + '/v2/movie/subject/';
		var searchSubjects = function(search_for, onsuccess){
			var res = [];
			var url = searchapi + encodeURIComponent(search_for);
			$http.get(url).success(function(data){
				var sbjs = data.subjects;
				for(var i = 0; i < sbjs.length; i++){
					var result = {};
					result.title = sbjs[i].title;
					result.year = sbjs[i].year;
					result.rating = sbjs[i].rating.average;
					result.image = sbjs[i].images.small;
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
					result.alt = sbjs[i].alt;
					result.id = sbjs[i].id;
					res.push(result);
				}
				onsuccess(res);
			});
		};
		var getSubject = function(id, onsuccess){
			var url = subjectapi + id;
			onsuccess(url);
			/*
			$http.get(url).success(function(data){

			});
			*/
		};
		var test = function(){
			count++;
			alert(count);
		};
		return {
			search: searchSubjects,
			getOne: getSubject,
			test: test
		}
	}
]);
