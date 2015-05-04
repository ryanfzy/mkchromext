angular.module('youtubeModule', []).factory('youtubeapi', ['$http',
	function($http){
        var key = 'AIzaSyBdJBVaF4Hy-Zlc_y3F5DU8H1iK1BRCHA4';
        var url = 'https://www.googleapis.com/youtube/v3/search';
        var api = createAPI.createService(url);
        youtubeapi.addRequestTags(['channelId', 'channelType', 'eventType', 'location',
            'locationRadius', 'maxResults', 'order', 'pageToken', 'publishedAfter',
            'publishedBefore', 'q', 'regionCode', 'relevanceLanguage', 'safeSearch',
            'topicId', 'type', 'videoCaption', 'videoCategoryId', 'videoDefinition',
            'videoDimension', 'videoDuration', 'videoEmbeddable', 'videoLicense',
            'videoSyndicated', 'videoType', 'key', 'part']
        );

        $http.defaults.headers.common.Referer = 'https://www.moviekong.com/';

        var qpart = '|trailer';

        var search_more = function(query, onsuccessFn){
            api.startNew().part('snippet').key(key);
            var apiurl = api.startNew().q(query+qpart).maxResults(10).order('relevance')
                .type('video').videoDuration('short').build();
            $http.get(apiurl).onsuccess(function(data){
                onsuccessFn(data);
            });
        };
		return {
            searchMore : search_more
		}
	}
]);
