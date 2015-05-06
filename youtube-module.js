chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
    details.requestHeaders.push({name: 'Referer', value: 'moviekong.com'});
    return {requestHeaders : details.requestHeaders};
}, {urls: ['<all_urls>']}, ['requestHeaders']);

angular.module('youtubeModule', []).factory('youtubeapi', ['$http',
	function($http){
        var key = 'AIzaSyBdJBVaF4Hy-Zlc_y3F5DU8H1iK1BRCHA4';
        var url = 'https://www.googleapis.com/youtube/v3/search';
        var api = createAPI.createService(url);
        api.addRequestTags(['channelId', 'channelType', 'eventType', 'location',
            'locationRadius', 'maxResults', 'order', 'pageToken', 'publishedAfter',
            'publishedBefore', 'q', 'regionCode', 'relevanceLanguage', 'safeSearch',
            'topicId', 'type', 'videoCaption', 'videoCategoryId', 'videoDefinition',
            'videoDimension', 'videoDuration', 'videoEmbeddable', 'videoLicense',
            'videoSyndicated', 'videoType', 'key', 'part']
        );

        //$http.defaults.headers.common.Referer = 'moviekong.com';
        var qpart = '|trailer';

        var search_more = function(query, onsuccessFn){
            api.startNew().part('snippet').key(key);
            var apiurl = api.q(query+qpart).maxResults(10).order('relevance')
                .type('video').videoDuration('short').build();
            alert(apiurl);
            $http.get(apiurl).success(function(data,status){
                console.log(data.items);
            }).error(function(data,status){
                alert(data.error.message);
                alert(status);
            });
        };
		return {
            searchMore : search_more
		}
	}
]);
