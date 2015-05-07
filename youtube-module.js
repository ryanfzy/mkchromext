/* from the api key from used by other people */
/*
chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
    details.requestHeaders.push({name: 'Referer', value: 'moviekong.com'});
    return {requestHeaders : details.requestHeaders};
}, {urls: ['<all_urls>']}, ['requestHeaders']);
*/

angular.module('youtubeModule', []).factory('youtubeapi', ['$http',
	function($http){
        var key = 'AIzaSyBdJBVaF4Hy-Zlc_y3F5DU8H1iK1BRCHA4';
        var searchurl = 'https://www.googleapis.com/youtube/v3/search';
        var videourl = 'https://www.googleapis.com/youtube/v3/videos';
        var watchurl = 'https://www.youtube.com/watch?{v}';
        var searchapi = createAPI.createService(searchurl);
        searchapi.addRequestTags(['channelId', 'channelType', 'eventType', 'location',
            'locationRadius', 'maxResults', 'order', 'pageToken', 'publishedAfter',
            'publishedBefore', 'q', 'regionCode', 'relevanceLanguage', 'safeSearch',
            'topicId', 'type', 'videoCaption', 'videoCategoryId', 'videoDefinition',
            'videoDimension', 'videoDuration', 'videoEmbeddable', 'videoLicense',
            'videoSyndicated', 'videoType', 'key', 'part']
        );

        var videoapi = createAPI.createService(videourl);
        videoapi.addRequestTags(['part', 'id', 'key']);

        var watchapi = createAPI.createService(watchurl);

        //$http.defaults.headers.common.Referer = 'moviekong.com';
        var qpart = ' trailer';

        var search_more = function(query, onsuccessFn){
            query = encodeURIComponent(query+qpart);
            searchapi.startNew().part('snippet').key(key);
            var apiurl = searchapi.q(query).maxResults(10).order('relevance')
                .type('video').videoDuration('short').build();
            $http.get(apiurl).success(function(data,status){
                var id = data.items[0].id.videoId;
                apiurl = watchapi.v(id).build();
                //TODO: make use of the apiurl
            }).error(function(data,status){
                alert(data.error.message);
                console.log(data);
            });
        };
		return {
            searchMore : search_more
		}
	}
]);
